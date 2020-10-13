import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import RadioOptions from './radiooptions'
import './page4.css';

class Page4 extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);

    const items = document.querySelectorAll('.items');
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  state = {
    show: false,
    tabIndex: -1,
    color: 'green'
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
    // console.log('------------------------------------------------------------')
    const items = document.querySelectorAll('.items');
    const currentIndex = this.state.tabIndex;
    const next = currentIndex + move;

    // console.log('tabIndex', currentIndex);
    // console.log('Items - ', items)
    // console.log('Current Index - ', currentIndex)

    if (next < items.length && next > -1) {
      // console.log('Next - ', next)
      const targetElement = items[next];
      // console.log('Target element - ', targetElement)
      targetElement.focus();
      this.setState({ tabIndex: next})
    }
  }

  handleClose = () => {
    this.setState({ show: false})
  }

  handleShow = () => {
    this.setState({ show: true})
    console.log('State ', this.state)
  }

  onRadioChange = (e) => {
    e.preventDefault();
    console.log('Color change - ', e.target.value)

    this.setState({
      color: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return(
      <div className="container">
        <Button variant="primary" className="items" tabIndex="0" onClick={this.handleShow}>
          Open Model Popup
        </Button>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Modal Popup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="items" tabIndex="1">Apple</div>
            <div className="items" tabIndex="2">Orange</div>
            <div className="items" tabIndex="3">Melon</div>

            <form onSubmit={this.onSubmit}>
              <strong>Select Color:</strong>

              <ul>
                <li>
                  <label>
                    <input
                      type="radio"
                      value="red"
                      checked={this.state.color === "red"}
                      onChange={this.onRadioChange}
                      className="items" tabIndex="4"
                    />
                    <span>Red</span>
                  </label>
                </li>

                <li>
                  <label>
                    <input
                      type="radio"
                      value="green"
                      checked={this.state.color === "green"}
                      onChange={this.onRadioChange}
                      className="items" tabIndex="5"
                    />
                    <span>Green</span>
                  </label>
                </li>

                <li>
                  <label>
                    <input
                      type="radio"
                      value="blue"
                      checked={this.state.color === "blue"}
                      onChange={this.onRadioChange}
                      className="items" tabIndex="6"
                    />
                    <span>Blue</span>
                  </label>
                </li>

                <li>
                  <label>
                    <input
                      type="radio"
                      value="orange"
                      checked={this.state.color === "orange"}
                      onChange={this.onRadioChange}
                      className="items" tabIndex="7"
                    />
                    <span>Ornage</span>
                  </label>
                </li>

                <li>
                  <label>
                    <input
                      type="radio"
                      value="purple"
                      checked={this.state.color === "purple"}
                      onChange={this.onRadioChange}
                      className="items" tabIndex="8"
                    />
                    <span>Purple</span>
                  </label>
                </li>
              </ul>

              <button type="submit" className="items" tabIndex="9">Choose Color</button>
            </form>

            <div role="radiogroup" aria-labelledby="gdesc1">
              <h3>
                Pizza Crust
              </h3>
              <div role="radio"
                   aria-checked="false"
                   tabindex="10" className="items">
                 Regular crust
              </div>
              <div role="radio"
                   aria-checked="false"
                   tabindex="11" className="items">
                 Deep dish
              </div>
              <div role="radio"
                   aria-checked="false"
                   tabindex="12" className="items">
                 Thin crust
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="items" tabIndex="13" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" className="items" tabIndex="14" onClick={this.handleClose}>
              Save It!
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

export default Page4
