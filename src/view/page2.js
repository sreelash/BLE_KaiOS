import React, { Component } from 'react'

class Page2 extends Component {

  componentDidMount() {
    document.activeElement.addEventListener('keydown', this.handleKeydown);
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
    console.log('Router handler clicked ', window.location.protocol);
    this.props.history.push('/page3')
  }

  render() {
    return (
      <div>
        <button className="items" tabIndex="0" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Page 2 Button</button>
      </div>
    );
  }
}

export default Page2
