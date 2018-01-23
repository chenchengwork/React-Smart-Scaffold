import './MainLayout.scss';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import T from 'utils/T';
import CustomIcon from 'templates/ToolComponents/CustomIcon';

import { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Icon, Dropdown, BackTop } from 'antd';
import { EnumIconTypes } from 'constants/EnumDefaultMenus';
import {
    UrlToExtraInfoMap,
    EnumFragmentMenu,
    getLeftMenu,
    getMenusByCategory,
    isRemoveLeftMenu
} from './menuUtil';

const { Header, Content, Sider } = Layout;


/**
 * 应用icon
 * @param appType
 * @param iconType
 * @return {*}
 * @constructor
 */
const AppIcon = ({appType, iconType, spin=false, style= {}}) => {
    if ( appType == EnumIconTypes.antd) {
        return <Icon type={iconType} spin={spin} style={style}/>
    }else if(appType == EnumIconTypes.custom) {
        return <CustomIcon type={iconType} spin={spin} style={style} />
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
    let customClassName = 'app-header';
    if (className) {
        customClassName = className + ' ' + customClassName;
    }
    let defaultStyle = {
        marginBottom: 10
    };

    const headerContent = [
        <div key="1" className="flex-box">
            <div className="vertical-bar" />
            <div className="title">{title}</div>
            {leftRender}
        </div>,
        <div key="2" className="flex-box">
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
export const MainContent = ({ className = '', style = {}, children = null }) => {
    let defaultStyle = {
        margin: '0px 10px 0px 10px',
    };

    return (
        <Content className={className} style={Object.assign(defaultStyle, style)}>

            {children}
        </Content>
    );
};

MainContent.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

@T.decorator.contextTypes('router')
export default class MainLayout extends Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            collapsed: false,
            menuCategory: '',
            appMenuLeftWidth: 180,		// 左侧菜单的宽度
        };
    }

    componentWillMount() {
        const { category, isCollapsedLeftMenu } = UrlToExtraInfoMap[this.context.router.route.match.path];

        if (category !== this.state.menuCategory) {
            this.setState({
                menuCategory: category,
                collapsed: isCollapsedLeftMenu,
                appMenuLeftWidth: this.getAppMenuLeftWidth(isCollapsedLeftMenu)
            });
        }
    }

    /**
     * 获取左侧菜单宽度
     * @param {bool} collapsed
     * @return {number}
     */
    getAppMenuLeftWidth(collapsed) {
        // 是否移除左侧菜单
        const currentUrl = this.context.router.route.match.path;
        if(isRemoveLeftMenu(currentUrl)) return 0;

        return collapsed ? 80 : 180;
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
        const childrenMenu = getMenusByCategory(this.state.menuCategory);
        const selectedKeys = (() => {
			for(let i = 0; i < childrenMenu.length; i++){
			    if(childrenMenu[i].url.indexOf(currentUrl) !== -1){
			        return [ Array.isArray(childrenMenu[i].url) ? childrenMenu[i].url[0] : childrenMenu[i].url ];
                }
            }
        })();

        return (
            <Header className="menu-header">
                <h2 className="logo">Demo</h2>
                <Menu
                    className="ant-menu-left"
                    theme="dark"
                    mode="horizontal"
					selectedKeys={selectedKeys}
                    style={{ lineHeight: '50px', float: 'left', marginLeft: 10, border: 0 }}
                >
                    {
                        childrenMenu.map((val) => {
                            const url = Array.isArray(val.url) ? val.url[0] : val.url;

                            return T.lodash.isUndefined(val.label) || T.lodash.isEmpty(val.label) ? null :(
                                <Menu.Item key={url} className={val.url.indexOf(currentUrl) !== -1 ? 'active' : ''}>
                                    <Link to={url}>
                                        <AppIcon {...val.icon} style={{marginRight: 5}}/>
                                        {val.label}
                                    </Link>
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>

                <Menu
                    className="ant-menu-right"
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '50px', float: 'right', marginLeft: 0 }}
                >
                    {
                        EnumFragmentMenu.map((val, key) => {
                            const url = val.url;
                            return <Menu.Item key={url + key}>
                                <Link to={url}>
                                    <img className="menu-icon" src={val.icon} />
                                    {val.label}
                                </Link>
                            </Menu.Item>;
                        })
                    }
                </Menu>

                <span className="menu-split right" />
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
                        title={<span><AppIcon {...val.icon} /><span>{val.label}</span></span>}
                    >
                        {formatLeftMenu(val.children)}

                    </Menu.SubMenu>
                );
            } else {
                const realUrl = (() => {
                    if (Array.isArray(val.url)){
                        if (val.url.indexOf(currentUrl) !== -1){
                            return currentUrl;
                        }
                        return val.url[0];
                    }
                    return val.url;
                })();

                return (
                    <Menu.Item key={realUrl}>
                        <Link to={Array.isArray(val.url) ? val.url[0] : val.url}>
                            {val.icon ? <AppIcon {...val.icon} /> : null}
                            <span>{val.label}</span>
                        </Link>
                    </Menu.Item>
                );
            }
        });

        return (
            <Sider
                className="menu-left"
                width={this.state.appMenuLeftWidth}
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onLeftMenuCollapse}
            >
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[currentUrl]}
                    defaultOpenKeys={recursionOpenKeys(leftMenu)}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {formatLeftMenu(leftMenu)}
                </Menu>
            </Sider>
        );
    }

    render() {
        const currentUrl = this.context.router.route.match.path;

        return (
            <Layout className="main-layout">

                {this.getHeaderMenu(currentUrl)}

                <Layout className="main-content">

                    {this.getLeftMenu(currentUrl)}

                    <Layout className="app-content" style={{ marginLeft: this.state.appMenuLeftWidth }}>
                        <BackTop style={{right: 100}}/>
                        {this.props.children}
                    </Layout>

                </Layout>

            </Layout>
        );

    }
}

