import "./MainLayout.scss";
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import T from 'utils/T';

import {Component} from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Icon,Dropdown } from 'antd';
import {UrlToCategoryMap,EnumFragmentMenu, getLeftMenu,getMenusByCategory, getMenuCategory,getMenuCategoryLabel} from './menuUtil';

const { Header, Content, Sider } = Layout;


/**
 * 头部组件
 * @param {String} className
 * @param {String} title
 * @param {Object} style
 * @param {Array} children
 * @returns {XML}
 * @constructor
 */
export const MainHeader = ({className = "",title = "",style = {},children}) => {
    let customClassName = 'app-header';
    if(className){
        customClassName = className + ' ' + customClassName;
    }
    let defaultStyle = {
        backgroundColor:"#ececec",
		marginBottom:10
    };

    return  (
		<Header className={customClassName} style={Object.assign(defaultStyle,style)}>
			<div className="vertical-bar" />
			<div className="title">{title}</div>
            {children}
		</Header>
    )
};

MainHeader.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    children:PropTypes.node
};


/**
 * 内容组件
 * @param {String} className
 * @param {Object} style
 * @param {Array} children
 * @returns {XML}
 * @constructor
 */
export const MainContent = ({className = "",style = {},children}) => {
    let defaultStyle = {
    	margin: '0px 0px 0px 10px' ,
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
    children:PropTypes.node.isRequired
};


export default class MainLayout extends Component {
	static contextTypes = {
		router:PropTypes.object.isRequired
	}

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

	    if(UrlToCategoryMap[this.context.router.route.match.path] != this.state.menuCategory) {
            this.setState({
                menuCategory: UrlToCategoryMap[this.context.router.route.match.path]
            })
        }
    }

    /**
	 * 左侧菜单的收起和关闭
     * @param collapsed
     */
	onLeftMenuCollapse = (collapsed) => {
		this.setState({
			collapsed ,
			appMenuLeftWidth:collapsed ? 64 : 180
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
				<h2 className="logo">天机数据</h2>

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
		})()

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
											return (
												<Menu.Item key={item.url}>
													<Link to={item.url}>
														{item.icon ? <Icon type={item.icon} /> : null}
														<span>{item.label}</span>
													</Link>
												</Menu.Item>
											)
										})}
									</Menu.SubMenu>
								)
							}else{
                                const url = T.lodash.isArray(val.url) ? val.url[0] : val.url;
                                return (
									<Menu.Item key={url}>
										<Link to={url}>
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


