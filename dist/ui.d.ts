/* RAVN UI — TypeScript Types */

export interface RAVNStore {
    _state: Record<string, unknown>;
    _listeners: Array<(key: string, value: unknown, state: Record<string, unknown>) => void>;
    set: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
    subscribe: (fn: (key: string, value: unknown, state: Record<string, unknown>) => void) => () => void;
}

export interface RAVNToastOptions {
    type?: 'success' | 'warning' | 'error' | 'info';
    duration?: number;
}

export interface RAVNAction {
    text: string;
    class?: string;
    onClick?: () => void;
    close?: boolean;
}

export interface RAVNModalConfig {
    title?: string;
    content?: string;
    actions?: RAVNAction[];
}

export interface RAVN {
    init: () => void;
    store: RAVNStore;
    on: (event: string, selector: string, handler: (e: Event, target: HTMLElement) => void) => void;
    fetch: (url: string, options?: RequestInit) => Promise<unknown>;
    route: (path: string, updateUrl?: boolean) => void;
    onViewEnter: (routeId: string, fn: () => void) => void;
    setTheme: (theme: string) => void;
    getTheme: () => string;
    initTheme: () => void;
    modal: {
        (config: RAVNModalConfig): void;
        (id: string, action: 'open' | 'close'): void;
    };
    toast: (message: string, options?: RAVNToastOptions) => void;
    showToast: (msg: string) => void;
    copy: (text: string, successMsg?: string) => void;
    view: (targetId: string) => void;
    toggleSidebar: () => void;
    initSidebar: () => void;
    _hooks?: Record<string, Array<() => void>>;
}

declare global {
    interface Window {
        RAVN: RAVN;
    }
}

export {};
