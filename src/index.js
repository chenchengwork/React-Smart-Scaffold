/**
 * @description 项目入口文件
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {IntlProvider, injectIntl} from 'react-intl';

import store from './store';

//加载路由
import Routes from './routes/index';

import {getLocale} from './locale';
var localeData = getLocale();

const IntlRoutes = injectIntl(Routes);
/**
 * 渲染程序
 */
const renderApp = () => render(
	<Provider store={store}>
    	{/*<Routes />*/}
		<IntlProvider locale={localeData.locale} messages={localeData.messages}>
    	<IntlRoutes />
		</IntlProvider>
	</Provider>,
	document.querySelector('#wrapper')
);

renderApp();

