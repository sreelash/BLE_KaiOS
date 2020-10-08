import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Page1 extends Component {

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
      </div>
    );
  }
}

export default Page1
