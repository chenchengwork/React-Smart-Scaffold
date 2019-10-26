import { configure } from 'mobx';
import { createContext } from 'react';
/**
 * mobx的配置
 */
configure({
    enforceActions: "observed",     // 强制使用action
});


interface StoreCtxVal {
    [index: string]: any
}

export const StoreCtx: React.Context<StoreCtxVal> = createContext({});

