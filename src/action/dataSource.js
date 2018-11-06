import {
    getDsPageList,
    getDs,
    createDs,
    updateDs,
    deleteDs,
    getDsTypes,
    getDsJsonSchema
} from '../api/dataSource';


/**
 * 获取数据源类型
 * @return {Promise}
 */
export const doGetDsTypes = () => getDsTypes();

/**
 * 获取数据源json schema
 * @param [type]    数据源类型
 * @return {Promise}
 */
export const doGetDsJsonSchema = (type) => getDsJsonSchema(type);

/**
 * 获取数据源列表
 * @param {Object} params
 * @param {Number} params.page
 * @param {Number} params.pageSize
 * @param {Object} params.search
 * @param {String} [params.search.name]
 * @return {Promise}
 */
export const doGetDsPageList = (params) => getDsPageList(params);

/**
 * 获取数据源
 * @param {String} data_source_id
 * @return {Promise}
 */
export const doGetDs = (data_source_id) => getDs(data_source_id);


/**
 * 创建数据源
 * @param {Object} params
 * @param {String} params.name
 * @return {Promise}
 */
export const doCreateDs = (params = {}) => createDs(params);

/**
 * 更新数据源
 * @param {String} data_source_id
 * @param {Object} params
 * @param {String} [params.name]
 * @param {String} [params.config]
 * @return {Promise}
 */
export const doUpdateDs = (data_source_id, params = {}) => updateDs(data_source_id, params);

/**
 * 删除数据源
 * @param {Array} data_source_ids
 * @return {Promise}
 */
export const doDeleteDs = (data_source_ids = []) => deleteDs(data_source_ids);

