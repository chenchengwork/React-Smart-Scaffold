import styles from './index.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import {checkType} from "@/utils/T";

import AppIcon from '../AppIcon';

const MenuHeader = ({currentUrl, menus, logout}) => (
    <Layout.Header className={styles["menu-header"]}>
        <div className={styles["logo"]} >
            {/*<img className={styles.logoImg} src={require("./img/logo.svg")} style={{height:35, marginTop: 6}} />*/}
            <span style={{width: 108}}>可视化平台</span>
        </div>

        <Menu
            className={styles["ant-menu-left"]}
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '60px', marginLeft: 0, border: 0 }}
        >
            {
                menus.map((val, key) => {

                    const linkTo = Array.isArray(val.url) ? val.url[0] : val.url;
                    const target = val.target || "";
                    const RouteLink = target === "_blank" ? ({children, to,  ...rest}) => (<a href={to} {...rest}>{children}</a>) : Link;

                    return checkType.isUndefined(val.label) || checkType.isEmpty(val.label) ? null : (
                        <Menu.Item key={linkTo + key} className={val.url.indexOf(currentUrl) !== -1 ? 'active' : ''}>
                            <RouteLink to={linkTo} target={target}>
                                {val.icon ? <AppIcon {...val.icon} style={{ marginRight: 10 }} /> : null}
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
