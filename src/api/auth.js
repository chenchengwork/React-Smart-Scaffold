import {request} from 'utils/T';
import EnumAPI from 'constants/EnumAPI';
const { get, postJSON } = request;

/**
 * 登录
 * @param {String} user_email
 * @param {String} password
 * @return {Promise}
 */
export const login = (user_email, password) => postJSON(EnumAPI.login, {user_email, password});

/**
 * 退出登录
 * @return {Promise}
 */
export const logout = () => get(EnumAPI.logout);


/**
 * 注册
 * @param {Object} params
 * @return {Promise}
 */
export const register = (params = {}) => postJSON(EnumAPI.register, params);

