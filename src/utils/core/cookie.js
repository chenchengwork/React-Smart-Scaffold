/**
 * @description cookie函数库
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { each } from './helper';

/**
 * 设置cookie
 * @param {string} name
 * @param {string} value
 * @param {string} exp
 * @param {string} path
 * @return {boolean}
 */
const set = (name, value, exp, path = '/') => {

    document.cookie = `${name}=${value};expires=${exp};path=${path}`;

    return true;
};

/**
 * 设置cookie
 * @param {string} name
 * @param {string} value
 * @param {number|Date} expTime
 * @param {string} path
 * @return {boolean}
 */
export const setCookie = (name, value, expTime, path = '/') => {

    const exp = new Date();

    exp.setTime((expTime instanceof Date) ? expTime.getTime() : exp.getTime() + (expTime * 1000));

    set(name, value, exp.toGMTString(), path);

    return true;
};

/**
 * 获取cookie
 * @param {string} name
 * @return {string|null}
 */
export const getCookie = (name) => {

    const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
    if (arr) {
        return unescape(arr[2]);
    }
    return null;
};

/**
 * 删除cookie
 * @param {string} name
 * @return {boolean}
 */
export const removeCookie = (name) => {


    const exp = new Date();

    exp.setTime(exp.getTime() - 1);

    const cookie = getCookie(name);

    if (cookie !== null) {

        set(name, cookie, exp.toGMTString());

        return true;
    }

    return false;
};

/**
 * 清空cookie
 * @return {boolean}
 */
export const clearCookie = () => {

    const keys = document.cookie.match(/[^ =;]+(?==)/g) || [];

    each(keys, key => set(key, 0, new Date(0).toUTCString()));

    return true;
};
