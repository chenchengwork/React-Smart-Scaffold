/**
 * Created by chencheng on 2017/6/16.
 */

const _processAPI = (api) => {


	return api;
}

/**
 * 枚举使用的路由
 * @type {{home, user}}
 */
const EnumAPI = {
	getUserList:_processAPI('/userList'),

}

export default EnumAPI;
