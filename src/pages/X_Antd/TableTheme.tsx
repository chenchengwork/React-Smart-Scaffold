import React from "react";
import { Table, Input, Select, Row, Col, Radio, Switch, Slider, TreeSelect } from 'antd';
import TransferTheme from './TransferTheme';
import MenuTheme from './MenuTheme';
import PaginationTheme from './PaginationTheme';
const dataSource = [
	{
		key: '1',
		name: '胡彦斌',
		age: 32,
		address: '西湖区湖底公园1号',
	},
	{
		key: '2',
		name: '胡彦祖',
		age: 42,
		address: '西湖区湖底公园1号',
	},
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
];

const TableTheme:React.FC = () => {

	return (
		<Row>
			<Col span={24}>
				<Row gutter={5} style={{marginBottom: 5}} align="middle">
					<Col span={4}>
						<Input defaultValue="激活状态" />
					</Col>
					<Col span={4}>
						<Input defaultValue="禁用状态" disabled={true} />
					</Col>
					<Col span={4}>
						<Select defaultValue="china" style={{width: "100%"}}>
							<Select.Option value="china">中国</Select.Option>
							<Select.Option value="america">美国</Select.Option>
						</Select>
					</Col>
					<Col span={4}>
						<Select defaultValue="china" disabled style={{width: "100%"}}>
							<Select.Option value="china">中国</Select.Option>
							<Select.Option value="america">美国</Select.Option>
						</Select>
					</Col>
					<Col span={4}>
						<Radio defaultChecked={false} disabled={true}>
							未选中禁止状态
						</Radio>
						<Radio defaultChecked={true} disabled={true}>
							选中禁止状态
						</Radio>
						<Radio defaultChecked={true}>
							选中非禁止状态
						</Radio>
						<Radio defaultChecked={false}>
							未选中非禁止状态
						</Radio>
					</Col>
					<Col span={4}>
						<p><Switch defaultChecked>选中</Switch></p>
						{/*<p><Switch defaultChecked disabled>选中</Switch></p>*/}
						{/*<p><Switch defaultChecked={false} disabled>选中</Switch></p>*/}
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row gutter={5}>
					<Col span={4}>
						<MenuTheme />
					</Col>
					<Col span={4}>
						<Slider defaultValue={30} disabled={true} />
						<Slider defaultValue={30} />
					</Col>
					<Col span={4}>
						<TreeSelect
							showSearch
							style={{ width: '100%' }}
							defaultValue="parent 1"
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							placeholder="Please select"
							allowClear
							treeDefaultExpandAll
						>
							<TreeSelect.TreeNode value="parent 1" title="parent 1">
								<TreeSelect.TreeNode value="parent 1-0" title="parent 1-0">
									<TreeSelect.TreeNode value="leaf1" title="my leaf" />
									<TreeSelect.TreeNode value="leaf2" title="your leaf" />
								</TreeSelect.TreeNode>
								<TreeSelect.TreeNode value="parent 1-1" title="parent 1-1">
									<TreeSelect.TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
								</TreeSelect.TreeNode>
							</TreeSelect.TreeNode>
						</TreeSelect>
					</Col>
					<Col span={4}>
						<TransferTheme />
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<PaginationTheme />
			</Col>
			<Col span={24}>
				<Table dataSource={dataSource} columns={columns} />
			</Col>
		</Row>
	)
};

export default TableTheme;
