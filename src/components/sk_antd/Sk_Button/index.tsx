import React, { Fragment } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import css from "styled-jsx/css";
export * from 'antd/lib/button';

interface Sk_ButtonProps extends ButtonProps{}

const Sk_Button: React.FC<Sk_ButtonProps> = (props) => {
	const { styles, className } = getStyle();

	return (
		<Fragment>
			<Button className={`${className} sk_button`} {...props}/>
			{styles}
		</Fragment>
	)
};

export default Sk_Button;

// language=SCSS
const getStyle = () => css.resolve`
	.sk_button{
		
	}
`;
