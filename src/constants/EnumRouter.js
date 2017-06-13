/**
 * Created by chencheng on 2017/6/13.
 */

const _processRoute = (route) => {
	return route;
}

/**
 * 枚举使用的路由
 * @type {{home, user}}
 */
const EnumRouter = {
	home:_processRoute('/home'),

	user:_processRoute('/user')
}


export default EnumRouter;

