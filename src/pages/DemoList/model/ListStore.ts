import prompt from '@/utils/prompt';
import { getPageList } from '../api';
import {observable, action, runInAction, toJS} from 'mobx';
import { RespDemoList } from "@/typings/api/response"

export type ListStoreType = ListStore;

export default class ListStore {
    @observable data: RespDemoList.DemoPageList = {
        list:[],
        page: 1,
        pageSize: 10,
        pageCount: 0,
        totalCount: 0
    };
    @observable loading = false;

    /**
     * 获取列表
     */
    @action
    fetchPageList = (params = {}) => {
        this.loading = true;
        params = Object.assign({ page: 1, pageSize: 10 }, params);
        getPageList(params).then(
            (resp) => runInAction(()=>{
                this.data = resp.data;
                this.loading = false;
            }),
            (resp) => runInAction(() => {
                this.loading = false;
                prompt.error(resp.msg);
            })
        );
    };

}





