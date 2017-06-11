/**
 * @description 用户登录/权限认证
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { getStorage, setStorage, removeStorage, keepStorage } from './storage';
import { isNone, isEmpty, call, difference } from './helper';

// 登录信息的本地存储key
const STORAGE_KEY = '__LOGIN_INFO__';

/**
 * 用户权限
 * @typedef {Array<string|number>} User~Permission
 */

/**
 * 用户
 * @typedef {Object} User
 * @property {string} id 用户ID
 * @property {string} name  用户名
 * @property {string} mobile 手机号
 * @property {number} createdAt 创建时间
 * @property {number} updatedAt 最后更新时间
 * @property {number} roleId 角色ID
 * @property {string} role 角色
 * @property {string} email 邮箱
 * @property {string} avatar    头像
 * @property {Object<User~Permission>} permissions
 */

/**
 * 登录
 * @param {User} user 要登录的用户
 * @param {number|Date=} exp 登录过期时间
 * @return {boolean}
 */
export const setLogin = (user, exp = 0) => setStorage(STORAGE_KEY, user, exp);

/**
 * 设置登录状态的有效期
 * @param {number|Date=} exp 登录过期时间
 */
export const keepLogin = exp => keepStorage(STORAGE_KEY, exp);


/**
 * 清除登录状态
 * @return {boolean}
 */
export const clearLogin = () => removeStorage(STORAGE_KEY);


/**
 * 获取当前登录用户
 * @return {User}
 */
export const getUser = () => getStorage(STORAGE_KEY);

/**
 * 判断是否登录
 * @return {boolean}
 */
export const isLogin = () => !isNone(getStorage(STORAGE_KEY));

/**
 * 强制验证是否已登录
 * @param {function=} callback 验证完以后的回调函数
 * @return {AjaxPromise}
 */
export const forceCheckLogin = (callback) => {
    setTimeout(() => call(callback), 0);
};


/**
 * 用一个回调函数判断用户是否有权限
 * @param {string} key 权限ID
 * @param {function(boolean|string|Array<number|string>)} callback
 * @return {*}
 */
export const canWith = (key, callback) => {

    if (isLogin()) {

        const user = getUser();

        const permissions = user.permissions[key];

        if (permissions === true) {

            return true;

            // 不存在的节点, 或者节点为false,或者节点是一个数组/对象, 但是为空
        } else if (isNone(permissions) || permissions === false || isEmpty(permissions)) {

            return false;
        }

        return call(callback, null, permissions, user, key) || false;
    }

    // 未登录状态, 无权限
    return false;
};


/**
 * 验证是否有权限
 * @param {string} key 权限ID
 * @param {Array<number|string>} args 权限参数(权限参数必须都有才算有权限)
 * @return {boolean}
 */
export const can = (key, args = []) => canWith(key, permissions => difference(args, permissions).length < 1);

/**
 * 验证是否没有权限
 * @param {string} key 权限ID
 * @param {Array<number|string>=} args 权限参数(权限参数必须都有才算有权限)
 * @return {boolean}
 */
export const cant = (key, args = []) => !can(key, args);

/**
 * 验证是否有权限
 * @param {string} key 权限ID
 * @param {Array<number|string>} args 权限参数(只要包含一个就算有权限)
 * @return {boolean}
 */
export const canOr = (key, args = []) =>
    canWith(key, permissions => (args.length === 0 ? true : difference(args, permissions).length < args.length));

/**
 * 验证是否没有权限
 * @param {string} key 权限ID
 * @param {Array<number|string>=} args 权限参数(只要包含一个就算有权限)
 * @return {boolean}
 */
export const cantOr = (key, args = []) => !canOr(key, args);

// TODO 调试用
window.auth = exports;
