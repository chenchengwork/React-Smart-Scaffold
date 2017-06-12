/**
 * Created by chencheng on 2017/6/12.
 */
import Login from './login';
import Home from './home';
import lazyLoad from '../components/LazyLoad';

import {
	BrowserRouter,
	Route,
	Link,
	Switch
} from 'react-router-dom'





import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends React.Component {
	state = {
		collapsed: false,
		mode: 'inline',
	};

	onCollapse = (collapsed) => {
		console.log(collapsed);
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
							<Menu.Item key="1">Home</Menu.Item>
							<Menu.Item key="2">Bill</Menu.Item>
							<Menu.Item key="3">Alex</Menu.Item>
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


const Routes = () => (
	<BrowserRouter
		forceRefresh={!('pushState' in window.history)}
		keyLength={12}
	>
		<div>
			{/*<ul>
				<li><Link to="/home">Home</Link></li>
				<li><Link to="/topics">Topics</Link></li>
				<li><Link to="/login">login</Link></li>
			</ul>*/}
			<SiderDemo>
				<Switch>
					<Route exact path="/" component={lazyLoad(Home)} />

					<Route path="/home" component={lazyLoad(Home)} />
					<Route path="/topics" component={Topics} />
					<Route path="/login" component={lazyLoad(Login)} />
					<Route component={NoMatch} />
				</Switch>
			</SiderDemo>

			<hr/>


		</div>

	</BrowserRouter>
)

const NoMatch = ({ location }) => (
	<div>
		<h3>No match for <code>{location.pathname}</code></h3>
	</div>
)

const Topics = ({ match }) => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>
					Rendering with React
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>
					Components
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>
					Props v. State
				</Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Topic}/>
		<Route exact path={match.url} render={() => (
			<h3>Please select a topic.</h3>
		)}/>
	</div>
)

const Topic = ({ match }) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
)

export default Routes


