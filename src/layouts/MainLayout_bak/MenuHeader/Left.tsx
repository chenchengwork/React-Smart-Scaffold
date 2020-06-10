import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import css from "styled-jsx/css";
import { checkType } from "@/utils/T";
import AppIcon from "@/components/AppIcon";
import { theme } from '@/constants/theme'
import {MenuHeaderProps} from './menuHeader.type'

const Left: React.FC<MenuHeaderProps> = ({currentUrl, menus}) => {
	const {className, styles} = getStyle();

	return (
		<Menu
			className={`left ${className}`}
			mode="horizontal"
			style={{lineHeight: '60px', marginLeft: 10, border: 0}}
		>
			{
				menus.map((val, key) => {
					const linkTo = Array.isArray(val.url) ? val.url[0] : val.url;
					const target = val.target || "";
					const RouteLink = target === "_blank" ? ({children, to, ...rest}: { children: React.ReactNode, to: string, target: string }) => (
						<a href={to} {...rest}>{children}</a>) : Link;

					return checkType.isUndefined(val.label) || checkType.isEmpty(val.label) ? null : (
						<Menu.Item key={linkTo + key} className={val.url.indexOf(currentUrl) !== -1 ? `active` : ''}>
							<RouteLink to={linkTo} target={target}>
								<AppIcon {...val.icon} style={{marginRight: 10}}/>
								{val.label}
							</RouteLink>
						</Menu.Item>
					);
				})
			}

			{styles}
		</Menu>
	)
}

const getStyle = () => {
	// language=SCSS
	return css.resolve`
        .left {
            flex: 1;
            background-color: ${theme.headerBgColor};
            display: flex;

            :global(.ant-menu-item) {
                padding: 15px 0;
                line-height: 20px;
				border-bottom: none;
				
                > :global(a) {
                    font-size: 14px;
                    font-weight: 500;
                    //color: #6E7A99;
                    color: ${theme.headerFontColor};
                    padding: 0 16px 0 26px;
                    border-right: 1px solid #384466;
                }
                
            }
			
			// hover效果的样式
			:global(.ant-menu-item.ant-menu-item-active) {
				border-bottom: none;
			 	> :global(a) {
			 		color: ${theme.headerFontColorActive};
			 	}
			}
			
            :global(.ant-menu-item:last-child) {
                > :global(a) {
                    border-right: none
                }
            }
			
			// 选中的样式
            :global(.ant-menu-item.active), :global(.ant-menu-item-selected) {
                //border-bottom: 2px solid #509be6;
                background-color: transparent;
                > :global(a) {
                    color: ${theme.headerFontColorActive};
                }
            }
        }
	`;
};

export default Left;
