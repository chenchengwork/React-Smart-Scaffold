import { configure } from 'mobx';

import screen from './pages/Screen/models';

/**
 * mobx的配置
 */
configure({
    enforceActions: "observed",     // 强制使用action
});


export default {
    screen
};
