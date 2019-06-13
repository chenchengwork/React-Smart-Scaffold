import locallyjs from 'locallyjs';
import * as helper from './core/helper';
import * as checkType from './core/checkType';
import * as request from './core/request';

import queryString from 'query-string';
import Cookies from 'js-cookie';
export {queryString}
export {Cookies}
export { helper }
export { checkType }
export { request }
export const localStore = new locallyjs.Store({
    compress: true,     // 开启压缩
});

