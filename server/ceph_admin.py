"""Ceph admin actions (admin only).

Routes:
  POST /api/clusters/{cid}/nodes/{node}/ceph/osd/{osdid}/in
  POST /api/clusters/{cid}/nodes/{node}/ceph/osd/{osdid}/out
  PUT  /api/clusters/{cid}/nodes/{node}/ceph/osd/{osdid}/reweight   body: {weight}
  GET  /api/clusters/{cid}/ceph/flags
  PUT  /api/clusters/{cid}/ceph/flags/{flag}                        body: {value}

OWASP design:
  A01 — admin only.
  A03 — osdid must be an int 0..65535; flag name from a static allow-list
        (PVE accepts a fixed set: noout, nobackfill, norebalance,
        norecover, noscrub, nodeep-scrub, pause, etc.). weight 0.0..1.0.
  A09 — every action audits the OSD id / flag.
"""
from __future__ import annotations

import logging

from aiohttp import web

from . import audit
from . import task_outcome
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


# Allow-list of cluster ceph flags. Anything else gets 400.
_ALLOWED_FLAGS = {
    "noout", "nobackfill", "norebalance", "norecover",
    "noscrub", "nodeep-scrub", "pause", "noup", "nodown",
}


def _audit(request: web.Request):
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


def _osdid(request: web.Request) -> int | None:
    try:
        n = int(request.match_info["osdid"])
    except (KeyError, ValueError):
        return None
    if n < 0 or n > 65_535:
        return None
    return n


@role_required("admin")
async def osd_in_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    osdid = _osdid(request)
    if osdid is None:
        return web.json_response({"error": "bad_osdid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.ceph_osd_in(node, osdid)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.osd.in",
                          target=f"{cid}/{node}/osd.{osdid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="ceph.osd.in",
                      target=f"{cid}/{node}/osd.{osdid}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def osd_out_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    osdid = _osdid(request)
    if osdid is None:
        return web.json_response({"error": "bad_osdid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.ceph_osd_out(node, osdid)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.osd.out",
                          target=f"{cid}/{node}/osd.{osdid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="ceph.osd.out",
                      target=f"{cid}/{node}/osd.{osdid}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def osd_reweight_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    osdid = _osdid(request)
    if osdid is None:
        return web.json_response({"error": "bad_osdid"}, status=400)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    try:
        weight = float(body.get("weight"))
    except (TypeError, ValueError):
        return web.json_response({"error": "bad_weight"}, status=400)
    if weight < 0.0 or weight > 1.0:
        return web.json_response({"error": "weight_out_of_range",
                                  "min": 0.0, "max": 1.0}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.ceph_osd_reweight(node, osdid, weight)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.osd.reweight",
                          target=f"{cid}/{node}/osd.{osdid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"weight": weight})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="ceph.osd.reweight",
                      target=f"{cid}/{node}/osd.{osdid}", cluster_id=cid,
                      result="ok", request_id=rid, params={"weight": weight})
    return web.json_response({"ok": True})


@role_required("admin")
async def get_flags_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        data = await cluster.client.ceph_get_flags()
    except Exception as e:
        return web.json_response({"error": "fetch_failed", "detail": str(e)}, status=502)
    return web.json_response({"flags": data, "allowed": sorted(_ALLOWED_FLAGS)})


@role_required("admin")
async def set_flag_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    flag = request.match_info["flag"]
    if flag not in _ALLOWED_FLAGS:
        return web.json_response({"error": "bad_flag",
                                  "allowed": sorted(_ALLOWED_FLAGS)}, status=400)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    value = bool(body.get("value", True))
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        if value:
            await cluster.client.ceph_set_flag(flag)
        else:
            await cluster.client.ceph_unset_flag(flag)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip,
                          action=f"ceph.flag.{'set' if value else 'unset'}",
                          target=f"{cid}/{flag}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip,
                      action=f"ceph.flag.{'set' if value else 'unset'}",
                      target=f"{cid}/{flag}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


_POOL_NAME_RE = __import__("re").compile(r"^[A-Za-z][A-Za-z0-9._\-]{0,63}$")
_DAEMON_ID_RE = __import__("re").compile(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$")


@role_required("admin")
async def mon_create_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.ceph_create_mon(node)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.mon.create",
                          target=f"{cid}/{node}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="ceph.mon.create", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}")
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def mon_delete_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    monid = request.match_info["monid"]
    if not _DAEMON_ID_RE.match(monid):
        return web.json_response({"error": "bad_monid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.ceph_delete_mon(node, monid)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.mon.delete",
                          target=f"{cid}/{node}/{monid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="ceph.mon.delete", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}/{monid}")
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def mgr_create_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.ceph_create_mgr(node)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.mgr.create",
                          target=f"{cid}/{node}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="ceph.mgr.create", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}")
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def mgr_delete_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    mgrid = request.match_info["mgrid"]
    if not _DAEMON_ID_RE.match(mgrid):
        return web.json_response({"error": "bad_mgrid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.ceph_delete_mgr(node, mgrid)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.mgr.delete",
                          target=f"{cid}/{node}/{mgrid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="ceph.mgr.delete", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}/{mgrid}")
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def mds_create_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.ceph_create_mds(node)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.mds.create",
                          target=f"{cid}/{node}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="ceph.mds.create", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}")
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def mds_delete_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    name = request.match_info["name"]
    if not _DAEMON_ID_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.ceph_delete_mds(node, name)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.mds.delete",
                          target=f"{cid}/{node}/{name}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="ceph.mds.delete", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}/{name}")
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def pool_create_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    name = (body.get("name") or "").strip()
    if not _POOL_NAME_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    try:
        pg_num = int(body.get("pg_num") or 128)
        size = int(body.get("size") or 3)
        min_size = int(body.get("min_size") or 2)
    except (TypeError, ValueError):
        return web.json_response({"error": "bad_int"}, status=400)
    if pg_num < 1 or pg_num > 65536:
        return web.json_response({"error": "bad_pg_num"}, status=400)
    if size < 1 or size > 16 or min_size < 1 or min_size > size:
        return web.json_response({"error": "bad_size_min_size"}, status=400)
    application = (body.get("application") or "rbd").strip()
    if application not in ("rbd", "cephfs", "rgw"):
        return web.json_response({"error": "bad_application"}, status=400)
    add_storages = bool(body.get("add_storages", False))
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.create_ceph_pool(
            node, name, pg_num=pg_num, size=size, min_size=min_size,
            application=application, add_storages=add_storages,
        )
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.pool.create",
                          target=f"{cid}/{node}/{name}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"pg_num": pg_num, "size": size, "min_size": min_size})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="ceph.pool.create", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}/{name}")
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def pool_delete_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    name = request.match_info["name"]
    if not _POOL_NAME_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    remove_storages = request.query.get("remove_storages", "0") in ("1", "true")
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.delete_ceph_pool(node, name, remove_storages=remove_storages)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="ceph.pool.delete",
                          target=f"{cid}/{node}/{name}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"remove_storages": remove_storages})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="ceph.pool.delete", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}/{name}")
    return web.json_response({"ok": True, "upid": upid})


ROUTES = [
    ("POST",   r"/api/clusters/{cluster_id}/nodes/{node}/ceph/osd/{osdid}/in",       osd_in_handler),
    ("POST",   r"/api/clusters/{cluster_id}/nodes/{node}/ceph/osd/{osdid}/out",      osd_out_handler),
    ("PUT",    r"/api/clusters/{cluster_id}/nodes/{node}/ceph/osd/{osdid}/reweight", osd_reweight_handler),
    ("GET",    r"/api/clusters/{cluster_id}/ceph/flags",                             get_flags_handler),
    ("PUT",    r"/api/clusters/{cluster_id}/ceph/flags/{flag}",                      set_flag_handler),
    ("POST",   r"/api/clusters/{cluster_id}/nodes/{node}/ceph/pool",                 pool_create_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/nodes/{node}/ceph/pool/{name}",          pool_delete_handler),
    ("POST",   r"/api/clusters/{cluster_id}/nodes/{node}/ceph/mon",                  mon_create_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/nodes/{node}/ceph/mon/{monid}",          mon_delete_handler),
    ("POST",   r"/api/clusters/{cluster_id}/nodes/{node}/ceph/mgr",                  mgr_create_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/nodes/{node}/ceph/mgr/{mgrid}",          mgr_delete_handler),
    ("POST",   r"/api/clusters/{cluster_id}/nodes/{node}/ceph/mds",                  mds_create_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/nodes/{node}/ceph/mds/{name}",           mds_delete_handler),
]
