import React, { Fragment } from "react";
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

import css from "styled-jsx/css";

interface Sk_PaginationProps extends PaginationProps{}

const Sk_Pagination: React.FC<Sk_PaginationProps> = (props) => {
	const { styles, className } = getStyle();

	return (
		<Fragment>
			<Pagination
				className={`${className} sk_pagination`}
				showSizeChanger={true}
				showQuickJumper={true}
				{...props}
			/>
			{styles}
		</Fragment>
	)
};

export * from 'antd/lib/pagination';
export default Sk_Pagination;

// language=SCSS
const getStyle = () => css.resolve`
	.sk_pagination{
		
	}
`;
