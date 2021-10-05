import React, {Component} from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { CardList } from './components/card-list/card-list.component';
import './App.css';
import List from './components/card-list/list.component';
import CardDetails from './components/card-details/card-details.component';

import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

const trackingId = "UA-168674184-1";
ReactGA.initialize(trackingId);

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });   // Update users current page
  ReactGA.pageview(location.pathname);    // Record a pageview for the given page
});
class App extends Component{

  render(){
      return(
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/details/:id/:offset/:limit" component={CardDetails} />
            <Route render={() =>
              <h1 className="text-center">WE ARE SORRY.<br/>BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h1>
            } />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;