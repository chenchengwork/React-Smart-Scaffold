import React, { Fragment } from "react";
import { Empty } from 'antd';

const EmptyTheme = () => {

	return (
		<Fragment>
			<Empty />
			<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
		</Fragment>
	);
};

export default EmptyTheme;
