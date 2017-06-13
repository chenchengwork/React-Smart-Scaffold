/**
 * Created by chencheng on 2017/6/12.
 */

import lazyLoad from '../templates/LazyLoad';

import User from './user';
import Home from './home';


import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom'


const Routes = ({store}) => (
	<BrowserRouter
		forceRefresh={!('pushState' in window.history)}
		keyLength={12}
	>
		<Switch>
			<Route exact path="/" component={lazyLoad(Home,store)} />

			<Route path="/home" component={lazyLoad(Home,store)} />
			<Route path="/user" component={lazyLoad(User,store)} />
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


