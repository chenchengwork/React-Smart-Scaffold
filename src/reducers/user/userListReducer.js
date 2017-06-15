import * as actionTypes from '../../constants/actionTypes/userList'
import update from 'immutability-helper';

const initState = {
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
        //设置用户列表
        case actionTypes.SET_USER_LIST:
			return update(state,{list:{$set:action.list}})

        default:
            break;
    }

    return state;
}

