/**
 * Created by chencheng on 2017/6/12.
 */

import T from '../../T'


/**
 *
 * @returns {Promise}
 */
export function getUserList(){
	 return T.request.get('/mockAPI/userList')
}
