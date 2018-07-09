import styles from './BaseComponent.scss';
import T from 'utils/T';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { PureComponent, Fragment } from 'react';
import { Icon, Spin } from 'antd';


@T.decorator.contextTypes('router', 'store')
export default class BaseComponent extends PureComponent {
    static Fragment = Fragment;
    static BoxContent = BoxContent;
    static BoxSpin = BoxSpin;

    /**
     * 创建setState防抖函数
     * @type {Function}
     */
    delaySetState = T.helper.debounce(this.setState, 100, this);

    /**
     * redux dispatch
     */
    dispatch = (...args) => this.context.store.dispatch(...args);

    /**
     * 获取URL中的参数
     * @returns {*}
     */
    getUrlParams = () => T.queryString.parse(this.context.router.route.location.search);

    /**
     * 更新状态
     * @param {Object} keyToValue {"key1.key2....": value}
     * @param {Function} callback 回调方法
     * @param {String} updateType 更新类型
     * @returns {*}
     */
    updateState = (keyToValue, callback = () => {}, updateType = "$set") => this.setState((preState) => {
        let updateObj = {};
        for (let [key, value] of Object.entries(keyToValue)) {
            Object.assign(updateObj, T.helper.getImmutabilityHelperContent(key, value, updateType))
        }

        return update(preState, updateObj);
    }, () => callback());

    /**
     * 更新redux store
     */
    updateStore = () => {

    }

}


/**
 * 异步加载标示
 * @param style
 * @param spinProps
 * @returns {*}
 * @constructor
 */
function BoxSpin({ style = {}, spinProps = {}}) {
    style = Object.assign({
        position: 'relative',
        width: '100%',
        minHeight: 200,
        textAlign: 'center',
    }, style);

    return (
        <div style={style} className={styles.center}>
            <Spin {...spinProps} />
        </div>
    );
}

BoxSpin.propTypes = {
    style: PropTypes.object,
    spinProps: PropTypes.object
};

/**
 * 内容加载处理
 * @param notDataBodyStyle
 * @param isNotData
 * @param loading
 * @param children
 * @returns {*}
 * @constructor
 */
function BoxContent({ notDataBodyStyle = {}, isNotData = false, loading = false, children }) {
    notDataBodyStyle = Object.assign({
        width: '100%',
        height: '100%',
        textAlign: 'center',
        padding: '10px 0px',
    }, notDataBodyStyle);

    if (T.lodash.isFunction(isNotData)) {
        isNotData = isNotData();
    }

    return (
        <Fragment>
            {
                (() => {
                    if (loading) {
                        return <BoxSpin />;
                    } else {
                        return !isNotData ? children : <div style={notDataBodyStyle} className={styles.center}>
                            <Icon type="frown-o" />暂无数据
                        </div>;
                    }
                })()

            }
        </Fragment>
    );
}

BoxContent.propTypes = {
    notDataBodyStyle: PropTypes.object,
    isNotData: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    loading: PropTypes.bool
};
