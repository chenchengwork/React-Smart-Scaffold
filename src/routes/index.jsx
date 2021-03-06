/**
 * Created by chencheng on 2017/6/12.
 */
import EnumRouter from 'constants/EnumRouter';
import T from 'utils/T';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { NoMatch } from './routeTool';

import CommonRoutes from './common';                    // 公共模块--相关路由,如:登录,注册...
import DataHubRoutes from './dataHub';                  // 数据采集--相关路由
import DataVisualRoutes from './dataVisual';            // 数据可视化--相关路由

/**
 * 检测是否登录
 * @return {*}
 */
const checkLoginRedirect = () => <Redirect to={T.auth.isLogin() ? window.ENV.login.defaultRedirectUrl : window.ENV.login.loginUrl} />;

/**
 * 路由配置
 * @constructor
 */
const Routes = () => (
    <BrowserRouter
        forceRefresh={!('pushState' in window.history)}
        keyLength={12}
    >
        <Switch>
            <Route exact path={EnumRouter.rootRoute} render={() => checkLoginRedirect()} />
            <Route exact path="/" render={() => checkLoginRedirect()}  />

            {/* 公共--路由 */}
            {CommonRoutes()}

            {/* 数据采集--路由 */}
            {DataHubRoutes()}

            {/* 数据可视化--路由 */}
            {DataVisualRoutes()}

            {/* 404 NOT found */}
            <Route component={NoMatch} />

        </Switch>

    </BrowserRouter>
);

export default Routes;
