/**
 * @description 项目入口文件
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { render } from 'react-dom';
import { Provider } from 'react-redux';

// 加载启动程序
// import './bootstrap';

import store from './store';


//加载路由
import Routes from './routes/index';

/**
 * 渲染程序
 */
const renderApp = () => render(
	<Provider store={store}>

    	<Routes />

	</Provider>,
	document.getElementById('wrapper')
);

renderApp();

store.subscribe(renderApp);
