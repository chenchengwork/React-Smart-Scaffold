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
            <div className="logo">
                <Logo />
            </div>
            <div className="content">
                <Left currentUrl={currentUrl} menus={menus} />
                <Right logout={logout} />
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
                .logo{
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }
                
                .content{
                    display: flex;
                    //align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }
            `}</style>
            {styles}
        </Layout.Header>
    );
};

export default MenuHeader;

