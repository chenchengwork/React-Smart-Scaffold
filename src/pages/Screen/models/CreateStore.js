import { observable, action, runInAction } from 'mobx';
import prompt from 'utils/prompt';
import {screen} from 'services/api';


export default class CreateStore {
    @observable saving = false;
    @observable loading = false;
    @observable data = null;

    @action
    fetchData = (screen_id) => {
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
    }

    @action
    save = (params) => {
        const { screen_id, data } = params;

        this.saving = true;
        const thenResp = [
            (resp) => runInAction(() => {
                this.saving = false;
                this.data = resp.data;
            }),
            (resp) => runInAction(() => {
                this.saving = false;
                prompt.error(resp.msg)
            }),
        ];

        if(screen_id){
            screen.update(screen_id, data).then(...thenResp);
        }else {
            screen.create(data).then(...thenResp);
        }
    }

}
