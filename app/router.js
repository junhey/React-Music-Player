import React from 'react';
import App from './page/app'
import Player from './page/player';
import Musiclist from './page/musiclist';

import { hashHistory,Router,Route,IndexRoute } from 'react-router'

class routes extends React.Component {
	render(){
		return (
			<Router history={hashHistory}>
				<Route path='/' component={App}>
					<IndexRoute component={Player} />
					<Route path='/list' component={Musiclist}></Route>
				</Route>
			</Router>
		)
	}
}
export default routes;