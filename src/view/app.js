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
  componentDidMount() {
    document.activeElement.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e) => {
    // console.log('Handle Key Down', e.key)

    switch(e.key) {
      case 'ArrowUp':
        this.nav(-1);
        break;
      case 'ArrowDown':
        this.nav(1);
        break;
      case 'ArrowRight':
        this.nav(1);
        break;
      case 'ArrowLeft':
        this.nav(-1);
        break;
    }
  }

  nav = (move) => {
    const currentIndex = document.activeElement.tabIndex;
    // console.log('Current Index - ', currentIndex)

    const next = currentIndex + move;
    // console.log('Next - ', next)

    const items = document.querySelectorAll('.items');
    const targetElement = items[next];
    // console.log('Target element - ', targetElement)

    targetElement.focus();
  }

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
