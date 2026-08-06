/**
 * Storage — top-level switch between the vault overview and the
 * per-storage detail page.
 *
 * Uses URL pathname to decide:
 *   /storage                                  → <StorageVault />
 *   /storage/{cluster_id}/{node}/{storage}    → <StorageDetail />
 *
 * No router library — listens to popstate so back/forward + direct URL
 * loads both work. App.tsx is the source of truth for the top-segment;
 * we only consume sub-segments here.
 */
import { useEffect, useState } from 'react';
import { StorageVault } from './StorageVault';
import { StorageDetail } from './StorageDetail';
import type { ClusterData } from '../types';

interface StorageProps {
  cluster: ClusterData | null;
  clusters?: Record<string, ClusterData>;
}

interface DetailRoute {
  clusterId: string;
  node: string;
  storage: string;
}

function parseDetailRoute(): DetailRoute | null {
  if (typeof window === 'undefined') return null;
  const parts = window.location.pathname.split('/').filter(Boolean);
  // Expect: ["storage", "{cid}", "{node}", "{storage}"]
  if (parts.length < 4 || parts[0] !== 'storage') return null;
  return {
    clusterId: decodeURIComponent(parts[1]),
    node:      decodeURIComponent(parts[2]),
    storage:   decodeURIComponent(parts[3]),
  };
}

export function Storage({ cluster, clusters }: StorageProps) {
  const [detail, setDetail] = useState<DetailRoute | null>(() => parseDetailRoute());

  useEffect(() => {
    const onPop = () => setDetail(parseDetailRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (detail) {
    // Build a single map for StorageDetail — it expects a Record but the
    // overview can run on either single-cluster or all-clusters mode.
    const map: Record<string, ClusterData> | null =
      clusters || (cluster ? { [cluster.id]: cluster } : null);
    return (
      <StorageDetail
        clusterId={detail.clusterId}
        node={detail.node}
        storageName={detail.storage}
        clusters={map}
      />
    );
  }

  return <StorageVault cluster={cluster} clusters={clusters} />;
}
