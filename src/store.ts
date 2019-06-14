import { configure } from 'mobx';
import { createContext } from 'react';

/**
 * mobx的配置
 */
configure({
    enforceActions: "observed",     // 强制使用action
});

export const StoreCtx = createContext({});

interface Store {
    [index: string]: () => object
}

export const stores: Store = {
    screen: require("./pages/Screen/models").default
};
