import React from "react";

import { Pagination } from 'antd';

function onShowSizeChange(current, pageSize) {
	console.log(current, pageSize);
}

const PaginationTheme:React.FC = () => {
	return (
		<div>
			<Pagination
				showSizeChanger
				onShowSizeChange={onShowSizeChange}
				defaultCurrent={3}
				total={500}
			/>
			<br />
			<Pagination
				showSizeChanger
				onShowSizeChange={onShowSizeChange}
				defaultCurrent={3}
				total={500}
				disabled
			/>
		</div>
	)
}

export default PaginationTheme;
