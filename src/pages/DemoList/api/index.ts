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
        list: [
            {
                name: "张三",
                age: 23,
                address: "大明湖畔"
            }
        ],
        page: 1,
        pageCount: 10,
        pageSize: 1,
        totalCount: 1,
    });

    return get(proxyAPI("/screen/getPageList"), params);
}
