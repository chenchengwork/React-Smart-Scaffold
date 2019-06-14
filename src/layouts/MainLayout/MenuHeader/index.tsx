import * as React from 'react'
import styles from './index.scss';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import {checkType} from "@/utils/T";
import { TypeMenu } from '../constants/EnumDefaultMenus'
import AppIcon from '../AppIcon';

interface MenuHeaderProps {
    currentUrl: string
    menus: TypeMenu[]
    logout: () => {}
}

const MenuHeader = ({currentUrl, menus, logout}: MenuHeaderProps) => (
    <Layout.Header className={styles["menu-header"]}>
        <img className={styles.logoImg} src={require("./img/logo.svg")}  />
        <span className={styles["logo"]}>React-Scaffold</span>

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
                            <RouteLink to={"a"} target={target}>
                                <AppIcon {...val.icon} style={{ marginRight: 10 }} />
                                {val.label}
                            </RouteLink>
                        </Menu.Item>
                    );
                })
            }
        </Menu>

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
    </Layout.Header>
);

MenuHeader.propTypes = {
    currentUrl: PropTypes.string.isRequired,
    menus: PropTypes.array.isRequired,
    logout: PropTypes.func.isRequired,
}

export default MenuHeader;
