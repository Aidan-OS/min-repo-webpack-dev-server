import React, { Component } from 'react';

import SinglePage from './components/singlepage';

import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

export default class extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={SinglePage} />
			</Router>
		)
	}
}