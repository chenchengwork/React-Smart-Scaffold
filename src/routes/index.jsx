/**
 * Created by chencheng on 2017/6/12.
 */
import lazyLoad from '../templates/LazyLoad';
import MainLayout from '../templates/MainLayout/MainLayout'

import EnumRouter from '../constants/EnumRouter';

import UserList from './userList';
import Home from './home';


import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom'


const Routes = () => (
	<BrowserRouter
		forceRefresh={!('pushState' in window.history)}
		keyLength={12}
	>
		<Switch>

			{/*主要布局*/}
			<MainLayout>
				<Route exact path="/" component={lazyLoad(Home)} />

				<Route path={EnumRouter.home} component={lazyLoad(Home)} />
				<Route path={EnumRouter.user} component={lazyLoad(UserList)} />
			</MainLayout>



			<Route component={NoMatch} />

		</Switch>

	</BrowserRouter>
)

const NoMatch = ({ location }) => (
	<div>
		<h3>No match for <code>{location.pathname}</code></h3>
	</div>
)

export default Routes


