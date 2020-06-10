import { proxyAPI } from '@/services/proxyAPI';
import { request, PromiseResp } from '@/utils/T';
const { get, mockRespData } = request;
import { RespDemoList } from '@/typings/api/response'

/**
 * 获取分页列表
 * @param {Object} params
 * @param {Number} params.page
 * @param {Number} params.pageSize
 * @param {Object} params.search
 * @param {String} [params.search.name]
 * @return {Promise}
 */
export const getPageList =  (params: {page?: number, pageSize?: number, search?:{[index: string]: any}}): PromiseResp<RespDemoList.DemoPageList> => {
    params.page = params.page || 1;
    params.pageSize = params.pageSize || 15;
    params.search = params.search || {};

    return mockRespData({
        list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((value) => ({
            name: "张三" + value,
            age: 23,
            address: "大明湖畔" + value
        })),
        page: 1,
        pageCount: 10,
        pageSize: 1,
        totalCount: 1,
    });

    return get(proxyAPI("/screen/getPageList"), params);
}
