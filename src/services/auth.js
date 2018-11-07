import { request, localStore } from 'utils/T';
import EnumAPI from 'constants/EnumAPI';
const { get, postJSON } = request;

/**
 * 权限管理
 */
class Permission {
    constructor() {
        this.localPermissioKey = "";
    }

    /**
     * 是否已经登录
     * @return {boolean}
     */
    isLogin(){

        return true;
    }

    /**
     * 是否可写
     */
    isWrite(mark) {
        const permissions = this.get();

        return Reflect.has(permissions, mark) ? permissions[mark] : false;
    }

    set(permissions = {}) {
        localStore.set(this.localPermissioKey, permissions);
    }

    get(){
        return localStore.get(this.localPermissioKey);
    }
}


export const permission = new Permission();

/**
 * 登录
 * @param {String} user_email
 * @param {String} password
 * @return {Promise}
 */
export const login = (user_email, password) => {
    return postJSON(EnumAPI.login, {user_email, password}).then((resp) => {
        // permission.set(resp);

        return resp;
    });
};

/**
 * 退出登录
 * @return {Promise}
 */
export const logout = () => get(EnumAPI.logout);


/**
 * 注册
 * @param {Object} params
 * @return {Promise}
 */
export const register = (params = {}) => postJSON(EnumAPI.register, params);


