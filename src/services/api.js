import {request, helper} from 'utils/T';
import EnumAPI from 'constants/EnumAPI';
const { get, postJSON, put, del } = request;

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

        return helper.mockData({
            count: 2,
            rows: [{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }]
        });

        return get(EnumAPI.screenPageList, params);
    },

    /**
     * 获取单个元素
     * @param {String} screen_id
     * @return {Promise}
     */
    get: (screen_id) => get(EnumAPI.getScreen, {screen_id}),

    /**
     * 创建元素
     * @param {Object} params
     * @param {String} params.name
     * @return {Promise}
     */
    create: (params = {}) => postJSON(EnumAPI.createScreen, params),

    /**
     * 更新元素
     * @param {String} screen_id
     * @param {Object} params
     * @param {String} [params.name]
     * @param {String} [params.config]
     * @return {Promise}
     */
    update: (screen_id, params = {}) => put(EnumAPI.updateScreen(screen_id), params),

    /**
     * 删除元素
     * @param {Array} screen_ids
     * @return {Promise}
     */
    delete: (screen_ids = []) => del(EnumAPI.deleteScreen, {screen_ids}),
};


