import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link, HashRouter } from 'react-router-dom';
import loadable from '@/utils/loadable';

import MainLayout from '@/layouts/MainLayout';
const Exception = loadable(import("@/components/Exception"));
const ErrorBoundary = loadable(import("@/components/ErrorBoundary"));

import { StoreCtx } from './store';
import EnumRouter from '@/constants/EnumRouter';
import EnumEnv from '@/constants/EnumEnv';
import { permission } from "@/services/auth";

export type TypeLazyComponent = Promise<{default: React.ComponentType<any>}>
interface typeStores {
    [index: string]: any
}
export type TypeRoutes = {uri: string|[], component: TypeLazyComponent, isMainLayout?: boolean, stores?: typeStores, props?: any}[]

// 懒加载组件
const lazy = (uri: string, component: TypeLazyComponent , isMainLayout: boolean, stores: typeStores, props: any) => {
    if(!permission.isLogin() && uri !== EnumEnv.login.loginUrl) return () => <Redirect to={EnumEnv.login.loginUrl} />;

    const LazyComponent = loadable(component);
    const Layout = isMainLayout ? MainLayout : React.Fragment;

    return () => {
        // 保证页面切换时, 重新实例化mobx状态实例
        const storeIns = {};
        if(stores){
            for(let [key, Store] of Object.entries(stores)){
                // @ts-ignore
                storeIns[key] = new Store();
            }
        }

        return(
            <StoreCtx.Provider value={storeIns}>
                <Layout>
                    <LazyComponent {...props} />
                </Layout>
            </StoreCtx.Provider>
        )
    }
};

/**
 * 检测是否登录
 * @return {*}
 */
const checkLoginRedirect = () => <Redirect to={permission.isLogin() ? EnumEnv.login.defaultRedirectUrl : EnumEnv.login.loginUrl} />;




/**
 * 路由配置
 * @param {Array} routes
 * @return {Function}
 *
 * usage:
 *  routes = [
         {
             uri: "/",                                          // 该字段必填
             component: import("./components/CodeEditor"),      // 该字段必填
             props: "传入组件的props"                             // 该字段可选, 必须是对象
             isMainLayout: true,                                // 该字段可选, 是否开启MainLayout布局, 默认是true
         },
    ];
 */
const transformRouter = (routes: TypeRoutes) => () => (
    <ErrorBoundary>
        <BrowserRouter
            forceRefresh={!('pushState' in window.history)}
            keyLength={12}
        >
            <Switch>
                <Route exact path={EnumRouter.rootRoute} render={() => checkLoginRedirect()} />
                <Route exact path="/" render={() => checkLoginRedirect()}  />

                {
                    routes.map((item, index) => {
                        // exact关键字表示对path进行完全匹配
                        let {uri, component, isMainLayout, stores, props} = item;
                        props = props || {};
                        isMainLayout = typeof isMainLayout === 'undefined' ? true : isMainLayout;

                        return (Array.isArray(uri)? uri : [uri]).map((realUri) =><Route
                            key={index}
                            path={realUri}
                            exact={true}
                            component={lazy(realUri, component, isMainLayout, stores, props)}
                        />);
                    })
                }

                {/*404页面*/}
                <Route component={() => <Exception type="404" style={{ minHeight: 500, height: '100%' }} linkElement={Link} />} />

            </Switch>

        </BrowserRouter>
    </ErrorBoundary>
);

export default transformRouter;


