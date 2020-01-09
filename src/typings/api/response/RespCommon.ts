/**
 * 定义API响应的数据结构
 */
export declare namespace RespCommon{
	/**
	 * 分页列表类型
	 */
	export interface PageList<T> {
		list: T[];
		page: number;
		pageCount: number;
		pageSize: number;
		totalCount: number;
	}
}
