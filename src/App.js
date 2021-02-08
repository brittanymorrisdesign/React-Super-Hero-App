import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { HeroesHome, SummaryPage } from './views/';


function App() {

	return (
		<Router>
			<div>
				<Switch>
				<Route exact path={['/', '/home']}component={HeroesHome} />
                <Route exact path='/summary' component={SummaryPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
