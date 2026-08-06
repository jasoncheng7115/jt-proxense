/**
 * JT-PROXENSE WebSocket Hook
 * Manages WebSocket connection with auto-reconnect
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import type { WSMessage, ClusterData } from './types';

interface UseWebSocketOptions {
  onMessage?: (data: Record<string, ClusterData>) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
  pingInterval?: number;
}

interface WebSocketState {
  connected: boolean;
  connecting: boolean;
  lastMessageTime: number;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const {
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    reconnectInterval = 2000,
    pingInterval = 5000,
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const pingIntervalRef = useRef<number | null>(null);
  const onMessageRef = useRef(onMessage);

  const [state, setState] = useState<WebSocketState>({
    connected: false,
    connecting: false,
    lastMessageTime: 0,
  });

  // Keep callback ref updated
  onMessageRef.current = onMessage;

  const getWsUrl = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    return `${protocol}//${host}/ws`;
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setState(prev => ({ ...prev, connecting: true }));

    const ws = new WebSocket(getWsUrl());
    wsRef.current = ws;

    ws.onopen = () => {
      setState({
        connected: true,
        connecting: false,
        lastMessageTime: Date.now(),
      });
      onConnect?.();

      // Start ping interval
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      pingIntervalRef.current = window.setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, pingInterval);
    };

    ws.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        setState(prev => ({ ...prev, lastMessageTime: Date.now() }));

        if (message.type === 'initial' || message.type === 'update') {
          if (message.data?.clusters && onMessageRef.current) {
            onMessageRef.current(message.data.clusters);
          }
        }
      } catch (e) {
        console.error('[WS] Failed to parse message:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('[WS] Error:', error);
      onError?.(error);
    };

    ws.onclose = () => {
      setState(prev => ({
        ...prev,
        connected: false,
        connecting: false,
      }));
      onDisconnect?.();

      // Clear ping interval
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }

      // Schedule reconnect
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reconnectTimeoutRef.current = window.setTimeout(() => {
        connect();
      }, reconnectInterval);
    };
  }, [getWsUrl, onConnect, onDisconnect, onError, reconnectInterval, pingInterval]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  // Connect on mount
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Health check - detect stale connection
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastMessage = now - state.lastMessageTime;

      // If no message for 15 seconds, reconnect
      if (state.connected && timeSinceLastMessage > 15000) {
        disconnect();
        connect();
      }
    }, 5000);

    return () => clearInterval(checkInterval);
  }, [state.connected, state.lastMessageTime, connect, disconnect]);

  return {
    connected: state.connected,
    connecting: state.connecting,
    lastMessageTime: state.lastMessageTime,
    send,
    reconnect: connect,
    disconnect,
  };
}
