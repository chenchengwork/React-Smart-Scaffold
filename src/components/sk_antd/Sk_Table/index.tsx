import React, { Fragment } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import css from "styled-jsx/css"
export * from 'antd/lib/table';

interface Sk_TableProps<RecordType = any> extends TableProps<RecordType>{

}

const Sk_Table: React.FC<Sk_TableProps> = (props) => {
	const { styles, className } = getStyle();

	return (
		<Fragment>
			<Table className={`${className} sk_table`} {...props}/>
			{styles}
		</Fragment>
	)
};

export default Sk_Table;

// language=SCSS
const getStyle = () => css.resolve`
	.sk_table{
		
	}
`;
