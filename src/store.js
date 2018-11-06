import { configure } from 'mobx';

import ScreenStore from './model/ScreenStore';
import DataSourceStore from './model/DataSourceStore';

/**
 * mobx的配置
 */
configure({
    enforceActions: "observed",     // 强制使用action
});

class Store {
    screenStore = new ScreenStore();
    dataSourceStore = new DataSourceStore();
}


export default new Store();
