import React, { Component } from 'react'

class Page3 extends Component {
  routerHandler = () => {
    console.log('Router handler clicked ', window.location.protocol);
    this.props.history.push('/page4')
  }

  render() {
    return (
      <div>
        <button className="items" tabIndex="0" onClick={this.routerHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Page 3 Button</button>
      </div>
    );
  }
}

export default Page3
