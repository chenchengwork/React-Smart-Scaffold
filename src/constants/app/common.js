/**
 * 获取pageList公共参数
 * @param page
 * @param search
 * @param pageSize
 * @return {{page: number, pageSize: number, search: {}}}
 */
export const getPageListParams = (page, search = {}, pageSize) => ({
    page: 1,
    pageSize: pageSize || 10,
    search: {}
});
