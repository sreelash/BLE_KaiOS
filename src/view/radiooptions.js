import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class RadioOptions extends Component {
  constructor(props) {
    super(props)

    console.log('Props ', props);
  }

  componentDidMount() {
    // document.activeElement.addEventListener('keydown', this.handleKeydown);
    //
    // const items = document.querySelectorAll('.mitems');
    // console.log('Items - ', items)
  }

  state = {
    show: false
  }

  handleClose = () => {
    this.setState({
      show: false
    })
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
    console.log('Current Index - ', currentIndex)

    const next = currentIndex + move;
    console.log('Next - ', next)

    const items = document.querySelectorAll('.mitems');
    const targetElement = items[next];
    console.log('Target element - ', targetElement)

    targetElement.focus();
  }

  render() {
    return(
      <div>
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

export default RadioOptions
