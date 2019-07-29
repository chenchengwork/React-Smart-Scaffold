import prompt from '@/utils/prompt';
import { getPageList, deleteScreen } from '../api';
import {observable, action, runInAction, toJS} from 'mobx';

const initData = {
    count: 0,
    rows: Array()
}

/**
 * 大屏状态管理
 */
export default class ListStore {
    @observable data = initData;                  // 树形结构数据

    @observable loading = false;
    @observable search: {[index: string]: any} = {
        name: ""
    };

    /**
     * 获取列表
     */
    @action
    fetchPageList = (params = {}) => {
        this.loading = true;
        params = Object.assign({ search: toJS(this.search), page: 1, pageSize: 10 }, params);
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

    /**
     * 删除元素
     * @param screen_ids
     */
    delItem = (screen_ids: string[] | string) => {
        screen_ids = !Array.isArray(screen_ids) ? [screen_ids] : screen_ids;
        return deleteScreen(screen_ids).then(
            () => this.fetchPageList(),
            (resp) =>  prompt.error(resp.msg)
        )
    };

    @action
    updateSearchAction = (key: string, value: any) => this.search[key] = value;
}





