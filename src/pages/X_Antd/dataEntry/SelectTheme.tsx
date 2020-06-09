import React from "react";
import { Select } from 'antd';
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
	children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
	console.log(`selected ${value}`);
}


const SelectTheme: React.FC = () => {

	return (
		<>
			<Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
				<Option value="jack">Jack</Option>
				<Option value="lucy">Lucy</Option>
				<Option value="disabled" disabled>
					Disabled
				</Option>
				<Option value="Yiminghe">yiminghe</Option>
			</Select>
			<Select defaultValue="lucy" style={{ width: 120 }} disabled>
				<Option value="lucy">Lucy</Option>
			</Select>
			<Select defaultValue="lucy" style={{ width: 120 }} loading>
				<Option value="lucy">Lucy</Option>
			</Select>
			<Select defaultValue="lucy" style={{ width: 120 }} allowClear>
				<Option value="lucy">Lucy</Option>
			</Select>

			<Select
				mode="multiple"
				style={{ width: '100%' }}
				placeholder="Please select"
				defaultValue={['a10', 'c12']}
				onChange={handleChange}
			>
				{children}
			</Select>
		</>
	);
};

export default SelectTheme;
