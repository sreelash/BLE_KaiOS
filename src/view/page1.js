import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Page1 extends Component {

  componentDidMount() {
    document.activeElement.addEventListener('keydown', this.handleKeydown);

    // var myElementToCheckIfClicksAreInsideOf = document.querySelector('#my-element');
    // Listen for click events on body
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e) => {
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

  routerHandler = () => {
    console.log('Router handler clicked ', this.props.history);
    // this.props.location = '/page2'
    this.props.history.push('/page2')
  }

  render() {
    return (
      <div>
        <div>
          <button className="items" tabIndex="0" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="1" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="2" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="3" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="4" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="5" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="6" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="7" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="8" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="9" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div>
          <button className="items" tabIndex="10" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Button for Page 1</button>
        </div>
        <div className="items" tabIndex="11" id="demo">
          Click here
        </div>
      </div>
    );
  }
}

export default Page1
