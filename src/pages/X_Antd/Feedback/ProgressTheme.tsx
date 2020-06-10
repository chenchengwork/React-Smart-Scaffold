import React from 'react';
import { Progress } from 'antd';


const ProgressTheme: React.FC = () => {

	return (
		<>
			<Progress percent={30} />
			<Progress percent={50} status="active" />
			<Progress percent={70} status="exception" />
			<Progress percent={100} />
			<Progress percent={50} showInfo={false} />
		</>
	)
}

export default ProgressTheme;
