/**
 * @description 项目入口文件
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

// 加载启动程序
// import './bootstrap';

import store from './store';
import routes from './routes';

/**
 * 渲染程序
 */
const renderApp = () => render(<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
</Provider>, document.getElementById('wrapper'));

renderApp();

store.subscribe(renderApp);
