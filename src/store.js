import { configure } from 'mobx';
import { createContext } from 'react';

/**
 * mobx的配置
 */
configure({
    enforceActions: "observed",     // 强制使用action
});

export const StoreCtx = createContext({});
