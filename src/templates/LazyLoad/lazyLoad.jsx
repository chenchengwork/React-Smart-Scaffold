/**
 * @description 页面的加载动画
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import PropTypes from 'prop-types';
import T from 'utils/T';
import { Spin } from 'antd';
import { Component as ReactComponent } from 'react';
import { STORE_INJECT } from 'store.js';

function injectReducers(reducers) {
	return { [STORE_INJECT]: { reducers }};
}

export default class LazyLoadTpl extends ReactComponent {
	static contextTypes = {
		store: PropTypes.shape({
			dispatch: PropTypes.func.isRequired
		})
	};

    static propTypes = {
        // 延迟加载函数
        lazyLoader: PropTypes.func.isRequired,
        reducers: PropTypes.oneOfType([
            PropTypes.func.isRequired,
            PropTypes.arrayOf(
                PropTypes.func.isRequired
            ).isRequired,
        ]),
    };

    state = {
        Component: null
    };

    componentDidMount() {
        if (!this.state.Component) {
            // 挂载完成后,开始加载远程组件
            this.props.lazyLoader(Component => this.setState({
                Component: Component.default
            }));
        }
    }

    render() {
        const Component = this.state.Component;

        if (Component) {
            if (!T.lodash.isUndefined(this.props.reducers)) {
                this.context.store.dispatch(injectReducers(
                    T.lodash.isArray(this.props.reducers) ? this.props.reducers : [this.props.reducers]
                ));
            }

            return <Component {...this.props} />;
        }

        // 默认显示加载动画
        return <Spin size="large" wrapperClassName="page-loading" />;

    }
}
