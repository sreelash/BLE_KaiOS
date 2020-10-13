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
      <div className="items" tabIndex="1">Apple</div>
      <div className="items" tabIndex="2">Orange</div>
      <div className="items" tabIndex="3">Melon</div>
      <form>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Male"
              className="items" tabIndex="4"
            />
            Male
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Female"
              className="items" tabIndex="5"
            />
            Female
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Other"
              className="items" tabIndex="6"
            />
            Other
          </label>
        </div>
    </form>
      </div>
    )
  }
}

export default RadioOptions
