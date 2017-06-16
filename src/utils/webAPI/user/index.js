/**
 * Created by chencheng on 2017/6/12.
 */

import T from '../../T'
import EnumAPI from '../../../constants/EnumAPI'

/**
 *
 * @returns {Promise}
 */
export function getUserList(){
	 return T.request.get(EnumAPI.getUserList);
}
