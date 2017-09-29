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
 * @type {{login}}
 */
const EnumAPI = {

	login:_processAPI('/p/login'),
}

export default EnumAPI;
