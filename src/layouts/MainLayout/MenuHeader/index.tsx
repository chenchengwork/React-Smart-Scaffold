import React from 'react'
import css from 'styled-jsx/css';
import { Layout } from 'antd';
import { MenuHeaderProps } from './menuHeader.type'

import Logo from "./Logo";
import Left from "./Left";
import Right from "./Right";
import { theme } from "@/constants/theme";

const MenuHeader: React.FC<MenuHeaderProps> = ({currentUrl, menus, logout}) => {
    // language=SCSS
    const {styles, className} = css.resolve`
        .menu-header{
            position: fixed;
            z-index: 100;
            width: 100%;
            height: ${theme.headerHeight}px;
            padding: 0;
            background-color: ${theme.headerBgColor};
            display: flex;
        }
    `;

    return (
        <Layout.Header className={`${className} menu-header`}>
            <Logo />
            <Left currentUrl={currentUrl} menus={menus} />
            <Right logout={logout} />
            {styles}
        </Layout.Header>
    );
};

export default MenuHeader;

