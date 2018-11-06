import {request, checkType, prompt} from 'utils/T';
import {observable, action, runInAction, toJS} from 'mobx';
import { doGetDsTypes, doGetDsJsonSchema, doGetDsPageList, doGetDs, doCreateDs, doUpdateDs, doDeleteDs } from 'action/dataSource';

/**
 * 数据源状态管理
 */
export default class DataSource {
    @observable data = {
        count: 0,
        rows: []
    }; // 树形结构数据
    @observable loading = false;
    @observable search = {
        name: ""
    };

    createDsStore = new CreateDs();

    /**
     * 获取数据源列表
     */
    @action
    fetchDsList = (page = 1, pageSize = 10) => {
        this.loading = true;
        const params = { page, pageSize, search: toJS(this.search) };

        doGetDsPageList(params).then(
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
     * 删除数据源
     * @param data_source_ids
     */
    delDs = (data_source_ids) => {
        data_source_ids = !Array.isArray(data_source_ids) ? [data_source_ids] : data_source_ids;
        return doDeleteDs(data_source_ids).then(
            (resp) => this.fetchDsList(),
            (resp) =>  prompt.error(resp.msg)
        )
    };

    @action
    updateSearchAction = (key, value) => this.search[key] = value;
}


class CreateDs{
    init_data = {
        name: "",
        type: null,
    };

    init_uiConf = {
        dsTypes: [],
        dsJsonSchema: {}
    };

    @observable visible = false;
    @observable loading = false;
    @observable saving = false;
    @observable data = this.init_data;
    @observable uiConf = this.init_uiConf;

    @action
    updateDataAction = (key, value) => this.data[key] = value;

    @action
    triggerVisibleAction = () => {
        this.visible = !this.visible;
        this.data = this.init_data;
        this.uiConf = this.init_uiConf;
    };

    @action
    getDsAction = (data_source_id) => {
        this.loading = true;

        request.all(doGetDsTypes(), doGetDsJsonSchema()).then(
            resp => runInAction(() => {
                const [ dsTypesResp, dsJsonSchemaResp ] = resp;
                const dsTypes = dsTypesResp.data;
                this.uiConf = {
                    dsTypes,
                    dsJsonSchema: dsJsonSchemaResp.data,
                };

                if(data_source_id) {
                    doGetDs(data_source_id).then(
                        resp => runInAction(() => {
                            this.loading = false;
                            this.data = resp.data;
                            resp.data.config = JSON.parse(resp.data.config);
                            this.data = resp.data;
                        }),
                        resp => runInAction(() => {
                            prompt.error(resp.msg);
                        })
                    )
                }else{
                    this.loading = false;
                }
            }),
            resp => runInAction(()=>{
                this.loading = false;
                prompt.error(resp.msg);
            })
        );


    };

    /**
     * 提交数据源
     * @param data_source_id
     * @param config
     * @param callbackSuccess
     * @param callbackFail
     */
    @action
    submitDsAction = (data_source_id, config, callbackSuccess, callbackFail) => {
        const name = this.data.name;
        const type = this.data.type;
        if(!name) return prompt.error("名称不能为空");
        if(!type) return prompt.error("数据源类型不能为空");

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

        if(!data_source_id){
            doCreateDs({config, name, type}).then(...respFunc)
        }else {
            doUpdateDs(data_source_id, {config, name}).then(...respFunc)
        }

    };
}





