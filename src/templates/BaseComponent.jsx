import T from 'utils/T';
import update from 'immutability-helper';

import BoxContent from './ToolComponents/BoxContent';
import BoxSpin from './ToolComponents/BoxSpin';

import { PureComponent, Fragment } from 'react';


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
