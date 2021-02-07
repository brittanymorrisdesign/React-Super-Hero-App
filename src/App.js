import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { HeroesHome, SummaryPage } from './views/';

function App() {

	return (
		<Router>
			<div>
				<Switch>
					<Route exact path={['/', '/home']}>
						<HeroesHome />
					</Route>
					<Route exact path={'/summary'}>
						<SummaryPage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
