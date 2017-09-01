/**
 * Created by chencheng on 17-8-30.
 */
import {
    Route
} from 'react-router-dom';

import lazyLoad from 'templates/LazyLoad';
import MainLayoutComponent from 'templates/MainLayout/MainLayout';

/**
 * 默认布局方式
 * @param Component
 * @param rest
 * @returns {XML}
 * @constructor
 */
export const DefaultLayout = ({ component: Component, reducers,...rest }) => {
    const LazyComponent = lazyLoad(Component,reducers);
    return (
        <Route
            {...rest} render={matchProps => (
            <LazyComponent {...matchProps} />
        )}
        />
    );
};

/**
 * 主要页面布局
 * @param Component
 * @param rest
 * @returns {XML}
 * @constructor
 */
export const MainLayout = ({ component: Component,reducers, ...rest }) => {
    const LazyComponent = lazyLoad(Component);

    return (
        <Route
            {...rest} render={matchProps => (
            <MainLayoutComponent>
                <LazyComponent {...matchProps} reducers={reducers}/>
            </MainLayoutComponent>
        )}
        />
    );
};

/**
 * 组装路由
 * @param {Array} routes
 * @returns {function()}
 * @constructor
 */
export const AssembleRoute = (routes) => {

    return () => routes.map((val) => {
        const { Layout } = val;
        delete val.Layout;
        return Layout ? <Layout {...val} key={val.path} /> : <MainLayout {...val} key={val.path} />
    })
};

/**
 * 未匹配到的页面
 * @param {Object} location
 * @constructor
 */
export const NoMatch = ({ location }) => (
    <div>
        <h3>No match for
            <code>{location.pathname}</code>
        </h3>
    </div>
);
