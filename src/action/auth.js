import {
    login,
    logout,
    register
} from '../api/auth';

/**
 * 登录
 * @param user_email
 * @param password
 * @return {Promise}
 */
export const doLogin = (user_email, password) => login(user_email, password);

/**
 * 退出登录
 * @return {Promise}
 */
export const doLogout = () => logout();

/**
 * 登录
 * @param {Object} params
 * @return {Promise}
 */
export const doRegister = (params) => register(params);
