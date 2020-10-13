import React, { Component } from 'react'
import RadioGrp from './radiogrp'

class Page3 extends Component {
  componentDidMount() {
    document.activeElement.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  state = {
    tabIndex: -1
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
    const currentIndex = this.state.tabIndex;
    // console.log('Current Index - ', currentIndex)

    const next = currentIndex + move;
    // console.log('Next - ', next)

    const items = document.querySelectorAll('.items');
    const targetElement = items[next];
    // console.log('Target element - ', targetElement)

    targetElement.focus();
    this.setState({ tabIndex: next})
  }

  routerHandler = () => {
    console.log('Router handler clicked ', window.location.protocol);
    // this.props.history.push('/page4')
  }

  render() {
    return (
      <div style={{backgroundColor: 'lightgray'}}>
        <button className="items" tabIndex="0" onClick={this.routerHandler} style={{backgroundColor: "rgba(52, 52, 52, 0)", borderColor:'rgba(52, 52, 52, 0)', margin: "10px", padding:"10px"}}>Page 3 Button</button>
        <RadioGrp />
      </div>
    );
  }
}

export default Page3
