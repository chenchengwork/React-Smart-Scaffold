import "./MainLayout.scss";
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import T from 'utils/T';

import {Component} from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Icon,Dropdown } from 'antd';
import {UrlToExtraInfoMap,EnumFragmentMenu, getLeftMenu,getMenusByCategory, getMenuCategory,getMenuCategoryLabel} from './menuUtil';

const { Header, Content, Sider } = Layout;

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
export const MainHeader = ({className = "",title = "",style = {},leftRender = null, rightRender = null}) => {
    let customClassName = 'app-header';
    if(className){
        customClassName = className + ' ' + customClassName;
    }
    let defaultStyle = {
		marginBottom:10
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

    return  (
		<Header className={customClassName} style={Object.assign(defaultStyle,style)}>
			{headerContent}
		</Header>
    )
};

MainHeader.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    children:PropTypes.node,
    leftRender:PropTypes.node,
    rightRender:PropTypes.node,
};


/**
 * 内容组件
 * @param {String} className
 * @param {Object} style
 * @param {Array} children
 * @returns {XML}
 * @constructor
 */
export const MainContent = ({className = "",style = {},children = null}) => {
    let defaultStyle = {
    	margin: '0px 10px 0px 10px' ,
		minHeight:640,
		backgroundColor:'#fff',
    };
    return (
		<Content className={className} style={Object.assign(defaultStyle,style)}>
            {children}
		</Content>
    )
};

MainContent.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    children:PropTypes.node
};

@T.decorator.contextTypes('router')
export default class MainLayout extends Component {
	constructor(){
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			collapsed: false,
            menuCategory:"",
			appMenuLeftWidth:180,		//左侧菜单的宽度
		}
	}

	componentDidMount(){
        const { category, isCollapsedLeftMenu } = UrlToExtraInfoMap[this.context.router.route.match.path]
	    if(UrlToExtraInfoMap != this.state.menuCategory) {
            this.setState({
                menuCategory: category,
                collapsed: isCollapsedLeftMenu,
                appMenuLeftWidth:this.getAppMenuLeftWidth(isCollapsedLeftMenu)
            })
        }
    }

    /**
	 * 获取左侧菜单宽度
     * @param {bool} collapsed
     * @return {number}
     */
    getAppMenuLeftWidth(collapsed){
		return collapsed ? 64 : 180;
	}

    /**
	 * 左侧菜单的收起和关闭
     * @param collapsed
     */
	onLeftMenuCollapse = (collapsed) => {
		this.setState({
			collapsed ,
			appMenuLeftWidth:this.getAppMenuLeftWidth(collapsed)
		});
	}

	/**
	 * 获取头部菜单
	 * @param currentUrl
	 * @returns {XML}
	 */
    getHeaderMenu = (currentUrl) => {
        const menu = (
            <Menu  onClick={({ item, key, keyPath }) => {
                this.setState({menuCategory:key},()=>{
                    this.context.router.history.push(item.props.url);
                })
            }}>
                {
                    getMenuCategory().map((val) => {
                        return (
                            <Menu.Item key={val.value} url={val.url}>
                                <a>{val.label}</a>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        );

		return (
			<Header className="menu-header">
				<h2 className="logo">Demo</h2>

                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" style={{
                        float:'left',
                        height:47,
                        fontSize:16,
                        lineHeight:'47px',
                        color:"#fff",
                        marginLeft:20
                    }} href="">
                        <span>{getMenuCategoryLabel(this.state.menuCategory)}</span> <Icon type="down" />
                    </a>
                </Dropdown>

                <span className="menu-split left" />

                <Menu
					className="ant-menu-left"
					theme="dark"
					mode="horizontal"
					style={{ lineHeight: '50px', float: 'left', marginLeft: 10, border:0 }}
				>
					{
                        getMenusByCategory(this.state.menuCategory).map((val, key) => {
							const url = T.lodash.isArray(val.url) ? val.url[0] : val.url;

							return <Menu.Item key={url + key} className={val.url.indexOf(currentUrl) !== -1 ? "active" : ""}><Link to={url}>{val.label}</Link></Menu.Item>
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
							</Menu.Item>
						})
					}
				</Menu>

				<span className="menu-split right" />
			</Header>
		)
	}

	/**
	 * 获取左侧菜单
	 * @param currentUrl
	 * @returns {*}
	 */
	getLeftMenu(currentUrl){
		const leftMenu = getLeftMenu(currentUrl,this.state.menuCategory);

		if(leftMenu.length < 1){
			return null;
		}

		const defaultOpenKeys = (()=>{
			for(let i = 0; i < leftMenu.length; i++){
				if(leftMenu[i].url.indexOf(currentUrl) !== -1){
					return T.lodash.isArray(leftMenu[i].url) ? leftMenu[i].url.join('-') : leftMenu[i].url;
				}
			}
		})();

		//获取实际URL
		const getRealUrl = (url) => {
            let realUrl = null;
			let firstUrl = null;

            if(Array.isArray(url)){
                if(url.indexOf(currentUrl) !== -1){
                    realUrl = currentUrl;
                }else{
                    realUrl = url[0];
				}

                firstUrl = url[0];
            }else{
                realUrl = url;
                firstUrl = url;
            }

            return {realUrl,firstUrl};
		};

		return (
			<Sider
				className="menu-left"
				width={this.state.appMenuLeftWidth}
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onLeftMenuCollapse}
			>
				<Menu
					mode="inline"
					selectedKeys={[currentUrl]}
					defaultOpenKeys={[defaultOpenKeys]}
					style={{ height: '100%', borderRight: 0 }}
				>
					{
                        leftMenu.map((val) => {

                            if(val.children.length > 0){

								return (
									<Menu.SubMenu
										key={val.url.join('-')}
										title={<span><Icon type={val.icon} /><span>{val.label}</span></span>}
									>
										{val.children.map((item)=>{

                                            let { realUrl, firstUrl } = getRealUrl(item.url);

											return (
												<Menu.Item key={realUrl}>
													<Link to={firstUrl}>
														{item.icon ? <Icon type={item.icon} /> : null}
														<span>{item.label}</span>
													</Link>
												</Menu.Item>
											)
										})}
									</Menu.SubMenu>
								)
							}else{
                                let { realUrl, firstUrl } = getRealUrl(val.url);

                                return (
									<Menu.Item key={realUrl}>
										<Link to={firstUrl}>
                                            {val.icon ? <Icon type={val.icon} /> : null}
											<span>{val.label}</span>
										</Link>
									</Menu.Item>
                                )
							}

						})
					}


				</Menu>
			</Sider>
		)
	}

    render() {
        const currentUrl = this.context.router.route.match.path;

		return (
			<Layout className="main-layout">

				{this.getHeaderMenu(currentUrl)}

				<Layout className="main-content">

					{this.getLeftMenu(currentUrl)}

					<Layout className="app-content" style={{marginLeft:this.state.appMenuLeftWidth}}>
                        {this.props.children}
					</Layout>

				</Layout>

			</Layout>
		)

    }
}


