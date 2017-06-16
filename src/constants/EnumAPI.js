/**
 * Created by chencheng on 2017/6/16.
 */

const _processAPI = (api) => {

	if(ENV.mock.isStart){
		return "/mockAPI"+api;
	}

	return api;
}

/**
 *
 * @type {{getUserList}}
 */
const EnumAPI = {
	getUserList:_processAPI('/userList'),		//获取用户列表

}

export default EnumAPI;
