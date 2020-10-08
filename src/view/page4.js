import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import RadioOptions from './radiooptions'

class Page4 extends Component {
  componentDidMount() {
    document.activeElement.addEventListener('keydown', this.handleKeydown);

    const items = document.querySelectorAll('.items');
    console.log('Items - ', items)
  }

  state = {
    show: false
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
    const items = document.querySelectorAll('.items');
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;

    console.log('Items - ', items)
    console.log('Current Index - ', currentIndex)

    if (currentIndex < items.length) {
      console.log('Next - ', next)
      const targetElement = items[next];
      console.log('Target element - ', targetElement)
      console.log('Target element tabIndex before focus - ', document.activeElement.tabIndex)
      targetElement.focus();
      console.log('Target element tabIndex after focus - ', document.activeElement.tabIndex)
    }
  }

  handleClose = () => {
    this.setState({ show: false})
  }

  handleShow = () => {
    this.setState({ show: true})
    console.log('State ', this.state)
  }

  onChange = (value) => {
    console.log('Selected value ', value);
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="items" tabIndex="4" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" className="items" tabIndex="5" onClick={this.handleClose}>
              Save It!
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

export default Page4
