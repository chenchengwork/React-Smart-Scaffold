import React from 'react';
import { Skeleton } from 'antd';

const SkeletonTheme: React.FC = () => {

	return (
		<Skeleton avatar paragraph={{ rows: 4 }} />
	)
}

export default SkeletonTheme;
