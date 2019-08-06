import React from 'react'
import styles from './index.scss';
import * as PropTypes from 'prop-types';
import * as css from 'styled-jsx/css';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import {checkType} from "@/utils/T";
import { TypeMenu } from '../constants/EnumDefaultMenus'
import AppIcon from '../AppIcon';
import { theme } from "../theme";

interface MenuHeaderProps {
    currentUrl?: string
    menus?: TypeMenu[]
    logout?: () => {}
}

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
    `

    return (
        <Layout.Header className={`${className} menu-header`}>
            <Logo />
            <Left currentUrl={currentUrl} menus={menus} />
            <Right logout={logout} />
            {styles}
        </Layout.Header>
    );
}

MenuHeader.propTypes = {
    currentUrl: PropTypes.string.isRequired,
    menus: PropTypes.array.isRequired,
    logout: PropTypes.func.isRequired,
};

export default MenuHeader;

const Logo: React.FC = () => {
    return (
        <React.Fragment>
            <img className="logoImg" src={require("./img/logo.svg")}  />
            <span className="logo">React-Scaffold</span>
            {/*language=SCSS*/}
            <style jsx>{`
                .logo {
                    padding-left: 5px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    font-weight: 500;
                    text-align: center;
                    color: #07a8fb;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .logoImg{
                    width: 40px;
                    height: 50px;
                }
            `}</style>
        </React.Fragment>
    )
}

const Left: React.FC<MenuHeaderProps> = ({currentUrl, menus}) => {

    return (
        <Menu
            className={styles["ant-menu-left"]}
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '60px', marginLeft: 10, border: 0 }}
        >
            {
                menus.map((val, key) => {
                    const linkTo = Array.isArray(val.url) ? val.url[0] : val.url;
                    const target = val.target || "";
                    const RouteLink = target === "_blank" ? ({children, to,  ...rest}: {children: React.ReactNode, to: string, target: string}) => (<a href={to} {...rest}>{children}</a>) : Link;

                    return checkType.isUndefined(val.label) || checkType.isEmpty(val.label) ? null : (
                        <Menu.Item key={linkTo + key} className={val.url.indexOf(currentUrl) !== -1 ? 'active' : ''}>
                            <AppIcon appType="1" iconType="12" style={{ marginRight: 10 }}/>
                            <RouteLink to={val.url as string} target={target}>
                                <AppIcon {...val.icon} style={{ marginRight: 10 }} />
                                {val.label}
                            </RouteLink>
                        </Menu.Item>
                    );
                })
            }
        </Menu>
    )
}

const Right: React.FC<MenuHeaderProps> = ({logout}) => {

    return (
        <Menu
            className={styles["ant-menu-right"]}
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '60px', marginLeft: 10, border: 0 }}
        >
            <Menu.Item>
                <a onClick={logout} title="退出登录">
                    <Icon type="logout" />
                </a>
            </Menu.Item>
        </Menu>
    )
}
