import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router  } from 'react-router-dom'
import logo from './logo.svg';
import './app.css';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Header from "./header";
import Footer from "./footer";

class App extends Component {

  render() {
    return (
      <Router>
        <Header />
        <hr />
        <Switch>
          <Route path='/page2' component={Page2} />
          <Route path='/page3' component={Page3} />
          <Route path='/page4' component={Page4} />
          <Route path='/' component={Page1} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
