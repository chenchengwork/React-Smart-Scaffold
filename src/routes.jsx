/**
 * @description 程序路由
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import React from 'react';
import { Route, IndexRedirect} from 'react-router';

import LazyLoad from './templates/lazyLoad';

// 单页面
import LoginComponent from './components/login';


export default <Route path="/">

    {/* 默认首页 */}
    <IndexRedirect to="/pt" />

    {/* 登录页面 */}
    <Route path="login" component={LazyLoad(LoginComponent)} />

</Route>;
