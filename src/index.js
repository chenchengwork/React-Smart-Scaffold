/**
 * @description 项目入口文件
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import ErrorBoundary from 'templates/ToolComponents/ErrorBoundary';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider} from 'antd';

// 加载基础样式
import 'antd/lib/message/style';
import 'antd/lib/modal/style';
import './base.scss';

// 加载 redux store
import store from './store';

// 加载路由
import Routes from './routes/index';

/**
 * 渲染程序
 */
const renderApp = () => render(
    <ErrorBoundary>
        <Provider store={store()}>
            <LocaleProvider locale={require('antd/lib/locale-provider/zh_CN')}>
                <Routes />
            </LocaleProvider>
        </Provider>
    </ErrorBoundary>,
	document.querySelector('#wrapper')
);

renderApp();

