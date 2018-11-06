import {request} from 'utils/T';
import EnumAPI from 'constants/EnumAPI';
const { get, postJSON, put, del } = request;

/**
 * 获取数据源类型
 * @return {Promise}
 */
export const getDsTypes = () => get(EnumAPI.getDsTypes);

/**
 * 获取数据源json schema
 * @param [type]    数据源类型
 * @return {Promise}
 */
export const getDsJsonSchema = (type) => get(EnumAPI.getDsJsonSchema, { type });

/**
 * 获取数据源列表
 * @param {Object} params
 * @param {Number} params.page
 * @param {Number} params.pageSize
 * @param {Object} params.search
 * @param {String} [params.search.name]
 * @return {Promise}
 */
export const getDsPageList = (params) => {
    params.page = params.page || 1;
    params.pageSize = params.pageSize || 1;    // 查询全部
    params.search = params.search || {};
    return get(EnumAPI.getDsPageList, params);
}

/**
 * 获取数据源
 * @param {String} data_source_id
 * @return {Promise}
 */
export const getDs = (data_source_id) => get(EnumAPI.getDs, {data_source_id});

/**
 * 创建数据源
 * @param {Object} params
 * @param {String} params.name
 * @return {Promise}
 */
export const createDs = (params = {}) => postJSON(EnumAPI.createDs, params);

/**
 * 更新数据源
 * @param {String} data_source_id
 * @param {Object} params
 * @param {String} [params.name]
 * @param {String} [params.config]
 * @return {Promise}
 */
export const updateDs = (data_source_id, params = {}) => put(EnumAPI.updateDs(data_source_id), params);

/**
 * 删除数据源
 * @param {Array} data_source_ids
 * @return {Promise}
 */
export const deleteDs = (data_source_ids = []) => del(EnumAPI.deleteDs, {data_source_ids});

