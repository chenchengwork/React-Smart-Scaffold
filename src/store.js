/**
 * @description store
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { createStore, compose } from 'redux';

import { get as objectGet } from './utils/core/helper';

import reducers from './reducers';


/* eslint-disable no-underscore-dangle*/
// redux浏览器调试工具的全局变量以下划线开头和结尾
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */


// 创建store
const store = createStore(reducers, {}, composeEnhancers());

export const getState = store.getState;

/**
 * 派发事件
 *
 * @param {string} type 事件名
 * @param {Object=} params 参数对象
 */
export const dispatch = (type, params = {}) => store.dispatch({
    ...params,
    type
});

/**
 * 根据path获取state
 *
 * @param {string} path 路径
 * @return {*}
 */
export const get = path => objectGet(getState(), path);

export default store;
