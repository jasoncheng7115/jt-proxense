/**
 * useAuth — fetches /api/auth/me on mount.
 *
 * When auth.enabled=false on the server, /api/auth/me returns
 * {authenticated: false} with HTTP 200 — we treat that as "no auth wall,
 * everyone is allowed", and the hook returns user=null.
 *
 * When auth is enabled and there's no session, /api/auth/me returns 200
 * with {authenticated: false}; the api client's 401 redirect doesn't fire
 * because /api/auth/me is in the public-paths set. We expose that state
 * so callers can offer a Login link.
 *
 * When the session is valid, returns {user: CurrentUser, authEnforced: true}.
 */
import { useEffect, useState } from 'react';
import { api, type CurrentUser } from '../api';

export interface AuthState {
  loading: boolean;
  user: CurrentUser | null;
  /** When true, the server has auth on; when false it's open (v0.1 mode). */
  authEnforced: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [authEnforced, setAuthEnforced] = useState(false);

  const refresh = async () => {
    try {
      const r = await api.authMe();
      // The shape here lets us distinguish "auth off" from "auth on but anonymous".
      // In both cases authMe returns {authenticated:false}; we infer enforcement
      // by checking whether the SPA was reachable at all (it is — we're in it
      // — so being asked to /api/auth/me means the page was served. The server
      // redirects anonymous-with-auth-enabled to /login BEFORE serving /, so
      // any user reaching this code has either: auth off, or auth on + signed in).
      if (r.authenticated && r.user) {
        setUser(r.user);
        setAuthEnforced(true);
      } else {
        setUser(null);
        // We can't distinguish the two cases for free; default to "not enforced"
        // so we don't aggressively redirect users running the v0.1 path.
        setAuthEnforced(false);
      }
    } catch {
      setUser(null);
      setAuthEnforced(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try { await api.authLogout(); } catch { /* ignore */ }
    window.location.replace('/login');
  };

  useEffect(() => { refresh(); }, []);

  return { loading, user, authEnforced, refresh, logout };
}
