import {request} from 'utils/T';
import EnumAPI from 'constants/EnumAPI';
const { get, upload, postJSON, put, del } = request;

/**
 * 获取大屏列表
 * @param {Object} params
 * @param {Number} params.page
 * @param {Number} params.pageSize
 * @param {Object} params.search
 * @param {String} [params.search.name]
 * @return {Promise}
 */
export const getScreenPageList = (params) => {
    params.page = params.page || 1;
    params.pageSize = params.pageSize || 1000000;    // 查询全部
    params.search = params.search || {};
    return get(EnumAPI.screenPageList, params);
}

/**
 * 获取大屏
 * @param {String} screen_id
 * @return {Promise}
 */
export const getScreen = (screen_id) => get(EnumAPI.getScreen, {screen_id});

/**
 * 创建大屏
 * @param {Object} params
 * @param {String} params.name
 * @return {Promise}
 */
export const createScreen = (params = {}) => postJSON(EnumAPI.createScreen, params);

/**
 * 更新大屏
 * @param {String} screen_id
 * @param {Object} params
 * @param {String} [params.name]
 * @param {String} [params.config]
 * @return {Promise}
 */
export const updateScreen = (screen_id, params = {}) => put(EnumAPI.updateScreen(screen_id), params);

/**
 * 删除大屏
 * @param {Array} screen_ids
 * @return {Promise}
 */
export const deleteScreen = (screen_ids = []) => del(EnumAPI.deleteScreen, {screen_ids});

/**
 * 上传资源
 * @param params
 * @return {Promise}
 */
export const uploadSource = (params = {}) => upload(EnumAPI.uploadSource, params);

/**
 * 上传封面
 * @param screen_id
 * @param params
 * @return {Promise}
 */
export const uploadCover = (screen_id, params = {}) => upload(EnumAPI.uploadCover(screen_id), params);

