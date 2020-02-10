import React from "react";
import { Icon, Menu } from "antd";
import css from "styled-jsx/css";
import { MenuHeaderProps } from './menuHeader.type'

const Right: React.FC<MenuHeaderProps> = ({logout}) => {
	const { styles, className } = getStyle();

	return (
		<Menu
			// className={styles["ant-menu-right"]}
			className={`right ${className}`}
			mode="horizontal"
			style={{ lineHeight: '60px', marginLeft: 10, border: 0 }}
		>
			<Menu.Item>
				<a onClick={logout} title="退出登录">
					<Icon type="logout" />
				</a>
			</Menu.Item>

			{styles}
		</Menu>
	)
}

const getStyle = () => {

	// language=SCSS
	return css.resolve`
        .right {
            width: 100px;
            background-color: #1D2440;
            padding: 0 30px;

            :global(.ant-menu-item) {
                padding: 0;
                font-size: 14px;

                :global(a) {
                    font-size: 16px;
                    font-weight: 500;
                    color: #fafcff;

                    :global(i) {
                        font-size: 16px;
                        color: #fafcff;
                        margin-right: 10px;
                    }
                }
            }

            :global(.ant-menu-item.ant-menu-item-selected) {
                background: none;
            }

            &:global(.ant-menu-dark.ant-menu-horizontal) {
                border: none;
            }
        }
	`;
};

export default Right;
