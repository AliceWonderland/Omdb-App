// CLIENT ENTRY FILE
// provider + store not in use
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { appStore } from './store';
import '../public/styles.scss';

import { Header, Footer, Main, TicTacToe, Omdb } from './components';

let store = createStore(appStore);
import { history } from './history.js';

ReactDOM.render(
  <Provider store={store}>
	  <Router path="/" history={history}>
		  <div className="App">
			  <Header path={window.location.href} />
			  <Switch>
				  <Route exact path="/" component={Main} />
				  <Route exact path="/tictactoe" component={TicTacToe} />
				  <Route exact path="/omdb" component={Omdb} />
				  <Route exact path="/reddit" component={Main} />
				  <Route component={Main} />
				  <Route path='*' component={Main} />
			  </Switch>
			  <Footer />
		  </div>
	  </Router>
  </Provider>,
  document.getElementById('app')
);

