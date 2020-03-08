import {observable, action, runInAction, toJS} from 'mobx';
import prompt from '@/utils/prompt';
import { getPageList } from '../api';
import { RespDemoList } from "@/typings/api/response"
import { PaginationStore } from '@/store';

export type ListStoreType = ListStore;

export default class ListStore extends PaginationStore{
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
    fetchPageList = (page = 1) => {
        this.setCurrentPage(page);
        const params = this.getPageListParams();
        this.loading = true;
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





