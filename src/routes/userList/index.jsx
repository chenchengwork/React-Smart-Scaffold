import {connect} from 'react-redux';

import UserList from '../../components/UserList/UserList'

const mapStateToProps = (state,ownProps) => {
	return {
		userListReducer:state.userListReducer,
		...ownProps
	}
}

const UserListComponent = connect(mapStateToProps)(UserList);

export default () => <UserListComponent />;
