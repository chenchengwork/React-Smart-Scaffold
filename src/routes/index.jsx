/**
 * Created by chencheng on 2017/6/12.
 */

import lazyLoad from '../templates/LazyLoad';
import Login from './login';
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
			<Route exact path="/" component={lazyLoad(Home)} />

			<Route path="/home" component={lazyLoad(Home)} />
			<Route path="/login" component={lazyLoad(Login)} />
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


