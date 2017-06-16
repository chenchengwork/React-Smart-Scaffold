import * as actionTypes from '../../constants/actionTypes/userList'
import update from 'immutability-helper';

const initState = {
    fetchStatus:false,
    list:[]
};

/**
 * 用户列表reducer
 * @param state
 * @param action
 * @returns {{list: Array}}
 */
export default (state = initState, action) => {

    switch (action.type) {
        //开启fetch状态
        case actionTypes.OPEN_FETCH_USER_LIST:
            return update(state,{fetchStatus:{$set:true}})

        //设置用户列表
        case actionTypes.SET_USER_LIST:
			return update(state,{
				fetchStatus:{$set:false},
			    list:{$set:action.list}
			})

        default:
            break;
    }

    return state;
}

