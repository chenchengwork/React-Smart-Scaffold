import styles from './index.scss';
import PropTypes from 'prop-types';
import {checkType} from 'utils/T';
import prompt from 'utils/prompt';
import CustomIcon from 'components/CustomIcon';

import { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu, Icon, BackTop } from 'antd';
import { EnumIconTypes } from 'constants/EnumDefaultMenus';
import { UrlToExtraInfoMap, getLeftMenu, getMenusByCategory, isRemoveLeftMenu } from './menuUtil';
const { Header, Content, Sider } = Layout;

import img_iconTj from './img/iconTj.png';
import { logout } from 'services/auth';
import EnumRouter from 'constants/EnumRouter';

/**
 * 应用icon
 * @param appType
 * @param iconType
 * @return {*}
 * @constructor
 */
const AppIcon = ({ appType, iconType, spin = false, style = {}}) => {
    if (appType == EnumIconTypes.antd) {
        return <Icon type={iconType} spin={spin} style={style} />;
    } else if (appType == EnumIconTypes.custom) {
        return <CustomIcon type={iconType} spin={spin} style={style} />;
    }

    return null;
};

/**
 * 头部组件
 * @param {String} className
 * @param {String} title
 * @param {Object} style
 * @param {Function} leftRender
 * @param {Function} rightRender
 * @returns {XML}
 * @constructor
 */
export const MainHeader = ({ className = '', title = '', style = {}, leftRender = null, rightRender = null }) => {
    let customClassName = styles['app-header'];
    if (className) {
        customClassName = className + ' ' + customClassName;
    }

    let defaultStyle = {
        marginBottom: 10
    };

    const iconConf = UrlToExtraInfoMap[window.location.pathname] ? UrlToExtraInfoMap[window.location.pathname].icon : {};

    const headerContent = [
        <div key="1" className={styles["flex-box"]}>
            <AppIcon {...iconConf} style={{ marginRight: 10 }} />
            <div className={styles["title"]}>{title}</div>
            {leftRender}
        </div>,
        <div key="2" className={styles["flex-box"]}>
            {rightRender}
        </div>
    ];

    return (
        <Header className={customClassName} style={Object.assign(defaultStyle, style)}>
            {headerContent}
        </Header>
    );
};
MainHeader.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    leftRender: PropTypes.node,
    rightRender: PropTypes.node,
};


/**
 * 内容组件
 * @param {String} className
 * @param {Object} style
 * @param {Array} children
 * @returns {XML}
 * @constructor
 */
export const MainContent = ({ className = '', style = {}, children = null, ...rest }) => {
    let defaultStyle = {
    	margin: '0px 10px 0px 10px',
    };
    return (
        <Content className={className} style={Object.assign(defaultStyle, style)} {...rest}>
            {children}
        </Content>
    );
};
MainContent.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

class MainLayout extends PureComponent {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            menuCategory: '',
            appMenuLeftWidth: 200,		// 左侧菜单的宽度
            openKeys: []
        };
    }

    componentDidMount() {
        const { category, isCollapsedLeftMenu } = UrlToExtraInfoMap[this.props.match.path] || {};

        if (UrlToExtraInfoMap !== this.state.menuCategory) {
            this.setState({
                menuCategory: category,
                collapsed: isCollapsedLeftMenu,
                appMenuLeftWidth: this.getAppMenuLeftWidth(isCollapsedLeftMenu)
            });
        }
    }

    /**
     * 退出登录
     */
    logout = () => prompt.confirm(
        () =>  logout().then(() => this.props.history.push(EnumRouter.login), resp => prompt.error(resp.msg)),
        {title: "确定退出登录?"}
    );

    /**
	 * 获取左侧菜单宽度
     * @param {bool} collapsed
     * @return {number}
     */
    getAppMenuLeftWidth(collapsed) {
        // 是否移除左侧菜单
        const currentUrl = this.props.match.path;
        if(isRemoveLeftMenu(currentUrl)) return 0;

        return collapsed ? 80 : 200;
    }

    /**
	 * 左侧菜单的收起和关闭
     * @param collapsed
     */
     onLeftMenuCollapse = (collapsed) => {
         this.setState({
             collapsed,
             appMenuLeftWidth: this.getAppMenuLeftWidth(collapsed)
         });
     }

    /**
	 * 获取头部菜单
	 * @param currentUrl
	 * @returns {XML}
	 */
    getHeaderMenu = (currentUrl) => {
        return (
            <Header className={styles["menu-header"]}>
                <img src={img_iconTj} style={{height:35, marginTop: 6}}/>
                <span className={styles["logo"]} style={{width: 108}}>可视化</span>

                <span className={`${styles["menu-split"]} ${styles.left}`} />

                <Menu
                    className={styles["ant-menu-left"]}
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '60px', marginLeft: 10, border: 0 }}
                >
                    {
                        getMenusByCategory(this.state.menuCategory).map((val, key) => {
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
                        <a onClick={this.logout} title="退出登录">
                            <AppIcon appType={EnumIconTypes.antd} iconType="logout" />
                        </a>
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }

    /**
	 * 获取左侧菜单
	 * @param currentUrl
	 * @returns {*}
	 */
    getLeftMenu(currentUrl) {
        const leftMenu = getLeftMenu(currentUrl, this.state.menuCategory);

        if (leftMenu.length < 1) return null;

		// 获取默认展开的菜单keys
		const recursionOpenKeys = (menus, openKeys = []) => {
			for (let i = 0; i < menus.length; i++) {
				const item = menus[i];
				if (item.url.indexOf(currentUrl) !== -1) {
					if(Array.isArray(item.url)){
						openKeys.push(item.url.join('-'))
					}

					if(item.children && item.children.length > 0){
						recursionOpenKeys(item.children, openKeys);
					}
				}
			}
			return openKeys;
		}

        // 递归获取菜单
        const formatLeftMenu = (menus) => menus.map((val) => {
            if (val.children.length > 0) {
                return (
                    <Menu.SubMenu
                        key={val.url.join('-')}
                        title={<span><AppIcon {...val.icon} style={{ fontSize: 14, marginRight: 10 }} /><span>{val.label}</span></span>}
                    >
                        {formatLeftMenu(val.children)}

                    </Menu.SubMenu>
                );
            } else {
                let realUrl = (() => {
                    if (Array.isArray(val.url)) {
                        if (val.url.indexOf(currentUrl) !== -1) {
                            return currentUrl;
                        }

                        return val.url[0];
                    }

                    return val.url;
                })();

                return (
                    <Menu.Item key={realUrl}>
                        <Link to={Array.isArray(val.url) ? val.url[0] : val.url}>
                            {val.icon ? <AppIcon {...val.icon} style={{ fontSize: 14, marginRight: 10 }} /> : null}
                            <span>{val.label}</span>
                        </Link>
                    </Menu.Item>
                );
            }
        });

        return (
            <Sider
                className={styles["menu-left"]}
                width={this.state.appMenuLeftWidth}
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onLeftMenuCollapse}
            >
                <Menu
                    mode="inline"
                    selectedKeys={[currentUrl]}
                    defaultOpenKeys={recursionOpenKeys(leftMenu)}
                    style={{ borderRight: 0, overflow: 'hidden' }}
                >
                    {formatLeftMenu(leftMenu)}
                </Menu>
            </Sider>
        );
    }

    render() {
        const currentUrl = this.props.match.path;

        return (
            <Layout className={styles["main-layout"]}>

                {this.getHeaderMenu(currentUrl)}

                <Layout className={styles["main-content"]}>

                    {this.getLeftMenu(currentUrl)}

                    <Layout className={styles["app-content"]} style={{ marginLeft: this.state.appMenuLeftWidth }}>
                        <BackTop style={{ right: 100 }} />
                        {this.props.children}
                    </Layout>

                </Layout>

            </Layout>
        );

    }
}

export default withRouter(MainLayout)
