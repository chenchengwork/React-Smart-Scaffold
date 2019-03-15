import styles from './index.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import {checkType} from "utils/T";

import AppIcon from './AppIcon';

const HeaderMenu = ({currentUrl, menus, logout}) => (
    <Layout.Header className={styles["menu-header"]}>
        <img src={require("./img/logo.svg")} style={{height:35, marginTop: 6}} />
        <span className={styles["logo"]} style={{width: 108}}>React脚手架</span>

        <Menu
            className={styles["ant-menu-left"]}
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '60px', marginLeft: 10, border: 0 }}
        >
            {
                menus.map((val, key) => {
                    const url = Array.isArray(val.url) ? val.url[0] : val.url;

                    return checkType.isUndefined(val.label) || checkType.isEmpty(val.label) ? null : (
                        <Menu.Item key={url + key} className={val.url.indexOf(currentUrl) !== -1 ? 'active' : ''}>
                            <Link to={url}>
                                <AppIcon {...val.icon} style={{ marginRight: 10 }} />
                                {val.label}
                            </Link>
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

HeaderMenu.propTypes = {
    currentUrl: PropTypes.string.isRequired,
    menus: PropTypes.array.isRequired,
    logout: PropTypes.func.isRequired,
}

export default HeaderMenu;
