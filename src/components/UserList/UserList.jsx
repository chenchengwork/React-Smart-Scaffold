/**
 * @description 登录页面
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Table } from 'antd';

import { fetchUserListAction } from '../../actions/user/userList';

import './UserList.scss';

export default class UserList extends Component {

	static contextTypes = {
		store:PropTypes.object.isRequired
	}

	static propTypes = {
		userListReducer:PropTypes.shape({
			fetchStatus:PropTypes.bool.isRequired,
			list:PropTypes.array.isRequired
		}).isRequired

	}

    constructor(props) {
		super(props);
    }

    componentDidMount(){
		this.context.store.dispatch(fetchUserListAction());
	}

    render() {

		const {fetchStatus,list} = this.props.userListReducer;

		const dataSource = list.map((val)=>{
			return {
				key: val.userId,
				name: val.name,
				age: val.age,
				address: val.address,
				action:(<div>
					<a>edit</a>,
					<a>delete</a>
				</div>)
			}
		})

		const columns = [
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '年龄',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: '住址',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '操作',
				dataIndex: 'action',
				key: 'action',
			}
		];

        return (
			<Table
				loading={fetchStatus}
				dataSource={dataSource}
				columns={columns} />
        );
    }
}
