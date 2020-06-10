import React from "react";
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const InputTheme: React.FC = () => {

	return (
		<>
			<Input
				size="large"
				placeholder="large size"
				prefix={<UserOutlined />}
				addonBefore="http://"
				addonAfter=".com"
			/>
			<br />
			<br />
			<Input placeholder="default size" prefix={<UserOutlined />} />
			<br />
			<br />
			<Input size="small" placeholder="small size" prefix={<UserOutlined />} />
		</>
	);
};

export default InputTheme;
