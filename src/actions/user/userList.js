/**
 * Created by chencheng on 2017/6/12.
 */

import * as actionTypes from '../../constants/actionTypes/userList'

import {
	getUserList
} from '../../utils/webAPI/user'

/**
 * 开启fetch状态
 * @private
 */
const _openFetchUserList = () => ({type:actionTypes.OPEN_FETCH_USER_LIST});

/**
 * 设置用户列表
 * @param list
 * @returns {{type: string, list: *}}
 * @private
 */
const _setUserListAction = (list) => {
	return {
		type:actionTypes.SET_USER_LIST,
		list:list
	}
}

export function fetchUserListAction() {

	return (dispatch) => {

		dispatch(_openFetchUserList())

		getUserList().then((resp)=>{

			dispatch(_setUserListAction(resp.data));

		},(resp)=>{
			console.log("error",resp)
		})
	}

}
