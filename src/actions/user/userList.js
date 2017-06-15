/**
 * Created by chencheng on 2017/6/12.
 */

import * as actionTypes from '../../constants/actionTypes/userList'

import {
	getUserList
} from '../../utils/webAPI/user'

export function fetchUserListAction() {

	getUserList().then((resp)=>{
		console.log("success",resp)
	},(resp)=>{
		console.log("error",resp)
	})

	return {
		type:actionTypes.SET_USER_LIST,

		list:[
			{
				userId: '1',
				name: '胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号',
			},
			{
				userId: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
			}
		]
	}
}
