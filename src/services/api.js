import { request } from 'utils/T';
import EnumAPI from 'constants/EnumAPI';
const { get, postJSON, put, del } = request;

// TODO 测试使用
import * as mockScreen from './mockScreen';

export const screen = {

    /**
     * 获取分页列表
     * @param {Object} params
     * @param {Number} params.page
     * @param {Number} params.pageSize
     * @param {Object} params.search
     * @param {String} [params.search.name]
     * @return {Promise}
     */
    getPageList:  (params) => {
        params.page = params.page || 1;
        params.pageSize = params.pageSize || 15;
        params.search = params.search || {};

        return mockScreen.getPageList();

        return get(EnumAPI.screen.getPageList, params);
    },

    /**
     * 获取单个元素
     * @param {String} screen_id
     * @return {Promise}
     */
    get: (screen_id) => {
        return mockScreen.getItem(screen_id);

        return get(EnumAPI.screen.getItem, {screen_id})
    },

    /**
     * 创建元素
     * @param {Object} params
     * @param {String} params.name
     * @return {Promise}
     */
    create: (params = {}) => {

        return mockScreen.createItem(params);

        return postJSON(EnumAPI.screen.createItem, params)
    },

    /**
     * 更新元素
     * @param {String} screen_id
     * @param {Object} params
     * @param {String} [params.name]
     * @param {String} [params.config]
     * @return {Promise}
     */
    update: (screen_id, params = {}) => {

        return mockScreen.updateItem(screen_id, params);

        return put(EnumAPI.screen.updateItem(screen_id), params)
    },

    /**
     * 删除元素
     * @param {Array} screen_ids
     * @return {Promise}
     */
    delete: (screen_ids = []) => {

        return mockScreen.deleteItem(screen_ids);

        return del(EnumAPI.screen.deleteItem, {screen_ids});
    },
};


