import { observable, action, runInAction } from 'mobx';
import prompt from 'utils/prompt';
import {checkType} from 'utils/T';
import {screen} from 'services/api';


export default class CreateStore {
    @observable saving = false;
    @observable loading = false;
    @observable data = {};

    /**
     * 获取数据
     * @param screen_id
     */
    @action
    fetchData = (screen_id) => {
        if(screen_id) {
            this.loading = true;
            screen.get(screen_id).then(
                (resp) => runInAction(() => {
                    this.loading = false;
                    this.data = resp.data;
                }),
                (resp) => runInAction(() => {
                    this.loading = false;
                    prompt.error(resp.msg)
                }),
            )
        }else {
            this.data = {};
        }
    };

    /**
     * 保存
     * @param screen_id
     * @param params
     * @param callbackSuccess
     * @param callbackFailed
     */
    @action
    save = (screen_id, params, callbackSuccess, callbackFailed) => {

        this.saving = true;
        const thenResp = [
            (resp) => runInAction(() => {
                this.saving = false;
                checkType.isFunction(callbackSuccess) && callbackSuccess();
            }),
            (resp) => runInAction(() => {
                this.saving = false;
                prompt.error(resp.msg);
                checkType.isFunction(callbackFailed) && callbackFailed();
            }),
        ];

        // 更新item
        if(screen_id){
            screen.update(screen_id, params).then(...thenResp);
        }
        // 创建item
        else {
            screen.create(params).then(...thenResp);
        }
    }

}
