import React from 'react';
import { configure } from 'mobx';
import { createContext } from 'react';
import 'mobx-react-lite/batchingForReactDom';

/**
 * mobx的配置
 */
configure({
    enforceActions: "observed",     // 强制使用action
});


interface StoreCtxVal {
    [index: string]: any
}

export {default as PaginationStore} from './PaginationStore';

export const StoreCtx: React.Context<StoreCtxVal> = createContext({});

