import React from "react";
import { Badge } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const AvatarTheme: React.FC = () => {

	return (
		<div>
			<Badge count={5}>
				<a href="#" className="head-example" />
			</Badge>
			<Badge count={0} showZero>
				<a href="#" className="head-example" />
			</Badge>
			<Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
				<a href="#" className="head-example" />
			</Badge>
		</div>
	);
};

export default AvatarTheme;
