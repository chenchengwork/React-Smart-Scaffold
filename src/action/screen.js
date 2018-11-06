import {
    getScreenPageList,
    getScreen,
    createScreen,
    updateScreen,
    deleteScreen,
    uploadSource,
    uploadCover
} from '../api/screen';

/**
 * 获取大屏列表
 * @param {Object} params
 * @param {Number} params.page
 * @param {Number} params.pageSize
 * @param {Object} params.search
 * @param {String} [params.search.name]
 * @return {Promise}
 */
export const doGetScreenPageList = (params) => getScreenPageList(params);

/**
 * 获取大屏
 * @param {String} screen_id
 * @return {Promise}
 */
export const doGetScreen = (screen_id) => getScreen(screen_id);


/**
 * 创建大屏
 * @param {Object} params
 * @param {String} params.name
 * @return {Promise}
 */
export const doCreateScreen = (params = {}) => createScreen(params);

/**
 * 更新大屏
 * @param {String} screen_id
 * @param {Object} params
 * @param {String} [params.name]
 * @param {String} [params.config]
 * @return {Promise}
 */
export const doUpdateScreen = (screen_id, params = {}) => updateScreen(screen_id, params);

/**
 * 删除大屏
 * @param {Array} screen_ids
 * @return {Promise}
 */
export const doDeleteScreen = (screen_ids = []) => deleteScreen(screen_ids);


/**
 * 上传资源
 * @param params
 * @return {Promise}
 */
export const doUploadSource = (params = {}) => uploadSource(params);

/**
 * 上传封面
 * @param screen_id
 * @param params
 * @return {Promise}
 */
export const doUploadCover = (screen_id, params = {}) => uploadCover(screen_id, params);
