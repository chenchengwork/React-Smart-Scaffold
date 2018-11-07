export helper from './core/helper';
export prompt from './core/prompt';
export queryString from 'query-string';
import locallyjs from 'locallyjs';

import * as checkType from './core/checkType';
import * as request from './core/request';
import * as decorator from './core/decorator';


export { checkType }
export { request }
export { decorator }
export const localStore = new locallyjs.Store({
    compress: true,     // 开启压缩
});

