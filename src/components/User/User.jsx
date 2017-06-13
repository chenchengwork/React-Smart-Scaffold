/**
 * @description 登录页面
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { Component } from 'react';
import { Table } from 'antd';

export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
		const dataSource = [
			{
				key: '1',
				name: '胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号',
				action:<a>delete</a>
			},
			{
				key: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
				action:<a>delete</a>
			}
		];

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

			<Table dataSource={dataSource} columns={columns} />
        );
    }
}
