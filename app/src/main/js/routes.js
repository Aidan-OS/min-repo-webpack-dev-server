import React, { Component } from 'react';

import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

export default class extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/">
					<div className="testdiv">
						<h1>Webpack dev server debug</h1>
					</div>
				</Route>
			</Router>
		)
	}
}