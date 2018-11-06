import {checkType, prompt} from 'utils/T';
import {observable, action, runInAction, toJS} from 'mobx';
import { doGetScreenPageList, doGetScreen, doCreateScreen, doUpdateScreen, doDeleteScreen, doUploadCover } from 'action/screen';

/**
 * 大屏状态管理
 */
export default class Screen {
    @observable data = {
        count: 0,
        rows: []
    };                  // 树形结构数据
    @observable loading = false;
    @observable search = {
        name: ""
    };

    createScreenStore = new CreateScreen();

    uploadCoverStore = new UploadScreenCover();

    /**
     * 获取大屏列表
     */
    @action
    fetchScreenList = () => {
        this.loading = true;
        const params = { search: toJS(this.search) };

        doGetScreenPageList(params).then(
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
     * 删除大屏
     * @param screen_ids
     */
    delScreen = (screen_ids) => {
        screen_ids = !Array.isArray(screen_ids) ? [screen_ids] : screen_ids;
        return doDeleteScreen(screen_ids).then(
            (resp) => this.fetchScreenList(),
            (resp) =>  prompt.error(resp.msg)
        )
    };

    @action
    updateSearchAction = (key, value) => this.search[key] = value;
}


class CreateScreen{
    @observable visible = false;
    @observable loading = false;
    @observable saving = false;
    data = {
        name: ""
    };

    @action
    updateDataAction = (key, value) => this.data[key] = value;

    @action
    triggerVisibleAction = () => {
        this.visible = !this.visible;
        if(!this.visible){
            this.data = {
                name: ""
            }
        }
    };

    @action
    getScreenAction = (screen_id) => {
        this.loading = true;
        doGetScreen(screen_id).then(
            resp => runInAction(() => {
                this.loading = false;
                this.data = resp.data;
            }),
            resp => runInAction(()=>{
                this.loading = false;
                prompt.error(resp.msg);
            })
        )
    };

    /**
     * 提交大屏
     * @param screen_id
     * @param data
     * @param callbackSuccess
     * @param callbackFail
     */
    @action
    submitScreenAction = (screen_id, data, callbackSuccess, callbackFail) => {
        this.saving = true;
        const respFunc = [
            resp => runInAction(() => {
                this.saving = false;
                this.visible = false;
                checkType.isFunction(callbackSuccess) && callbackSuccess();
                prompt.success("操作成功");
            }),
            resp => runInAction(()=>{
                this.saving = false;
                checkType.isFunction(callbackFail) && callbackFail();
                prompt.error(resp.msg);
            })
        ];

        if(!screen_id){
            doCreateScreen(data).then(...respFunc)
        }else {
            doUpdateScreen(screen_id, data).then(...respFunc)
        }

    };
}


class UploadScreenCover{
    @observable visible = false;
    @observable loading = false;
    @observable saving = false;
    data = {
        name: ""
    };

    @action
    updateDataAction = (key, value) => this.data[key] = value;

    @action
    triggerVisibleAction = () => {
        this.visible = !this.visible;
        if(!this.visible){
            this.data = {
                name: ""
            }
        }
    };

    @action
    getScreenAction = (screen_id) => {
        this.loading = true;
        doGetScreen(screen_id).then(
            resp => runInAction(() => {
                this.loading = false;
                this.data = resp.data;
            }),
            resp => runInAction(()=>{
                this.loading = false;
                prompt.error(resp.msg);
            })
        )
    };

    /**
     * 提交大屏
     * @param screen_id
     * @param data
     * @param callbackSuccess
     * @param callbackFail
     */
    @action
    submitCoverAction = (screen_id, data, callbackSuccess, callbackFail) => {
        this.saving = true;
        const respFunc = [
            resp => runInAction(() => {
                this.saving = false;
                this.visible = false;
                checkType.isFunction(callbackSuccess) && callbackSuccess();
                prompt.success("操作成功");
            }),
            resp => runInAction(()=>{
                this.saving = false;
                checkType.isFunction(callbackFail) && callbackFail();
                prompt.error(resp.msg);
            })
        ];

        doUploadCover(screen_id, data).then(...respFunc)
    };
}





