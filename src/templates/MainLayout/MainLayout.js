import {Component} from 'react'
import {Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class MainLayout extends Component {
	state = {
		collapsed: false,
		mode: 'inline',
	};

	onCollapse = (collapsed) => {
		this.setState({
			collapsed,
			mode: collapsed ? 'vertical' : 'inline',
		});
	}

	render() {
		return (
            <Layout>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    defaultCollapsed={false}
                    collapsedWidth={100}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />

                    <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
                        >
							<Menu.Item key="1">
								<Link to="/home">Home</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link to="/login">Login</Link>
							</Menu.Item>

                        </SubMenu>

                        <Menu.Item key="6">
						  <span>
							<Icon type="file" />
							<span className="nav-text">File</span>
						  </span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

							{this.props.children}
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>

            </Layout>
		);
	}
}
