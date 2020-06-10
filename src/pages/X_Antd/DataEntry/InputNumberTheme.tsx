import React from "react";
import { InputNumber } from 'antd';

const InputNumberTheme: React.FC = () => {

	return (
		<div>
			<InputNumber min={1} max={10} defaultValue={3}  />
		</div>
	);
};

export default InputNumberTheme;
