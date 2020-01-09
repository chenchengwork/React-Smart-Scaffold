import { RespCommon } from './RespCommon';

/**
 * 定义API响应的数据结构
 */
export declare namespace RespDemoList{

	export interface DemoItem {
		name: string;
		age: number;
		address: string;
	}

	export type DemoPageList = RespCommon.PageList<DemoItem>
}
