import { request, localStore, checkType, Cookies } from 'utils/T';
import EnumAPI from 'constants/EnumAPI';
import EnumEnv from 'constants/EnumEnv';
const { get, postJSON } = request;

/**
 * 权限管理
 */
class Permission {
    constructor() {
        this.localPermissioKey = "sk_permission";
    }

    /**
     * 是否已经登录
     * @return {boolean}
     */
    isLogin = () => EnumEnv.login.isStartLoginCheck ? !!Cookies.get(EnumEnv.login.cookieKey) : true;

    /**
     * 验证是否有权限
     */
    can(mark) {
        const permissions = this.get();

        return Reflect.has(permissions, mark) ? permissions[mark] : false;
    }

    /**
     * 保存权限
     * @param permissions
     */
    set(permissions = {}) {
        if(checkType.isPlainObject(permissions)) throw new Error("权限格式不正确");

        localStore.set(this.localPermissioKey, permissions);
    }

    /**
     * 获取权限
     * @return {*}
     */
    get(){
        return localStore.get(this.localPermissioKey);
    }

    /**
     * 清除权限
     */
    clear(){
        localStore.remove(this.localPermissioKey);
    }
}

/**
 * 导出权限
 * @type {Permission}
 */
export const permission = new Permission();


/**
 * 登录
 * @param {String} user_email
 * @param {String} password
 * @return {Promise}
 */
export const login = (user_email, password) => {
    return postJSON(EnumAPI.login, {user_email, password}).then((resp) => {
        // 用于保存当前登录者的权限信息
        permission.set({});

        return resp;
    });
};

/**
 * 退出登录
 * @return {Promise}
 */
export const logout = () => get(EnumAPI.logout).then(resp => {
    // 清空权限信息
    permission.clear();

    return resp;
});


/**
 * 注册
 * @param {Object} params
 * @return {Promise}
 */
export const register = (params = {}) => postJSON(EnumAPI.register, params);


