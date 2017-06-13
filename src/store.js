/**
 * @description store
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { createStore, compose } from 'redux';

// import { get as objectGet } from './utils/core/helper';

import reducers from './reducers';


/* eslint-disable no-underscore-dangle*/
// redux浏览器调试工具的全局变量以下划线开头和结尾
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */


// 创建store
const store = createStore(reducers, {}, composeEnhancers());

export const getState = store.getState;


export default store;
