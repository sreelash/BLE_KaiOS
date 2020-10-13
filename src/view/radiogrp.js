import React from 'react'
import ReactDOM from 'react-dom'
import RadioBtn from './radiobtn'

class RadioGrp extends React.Component {
  componentDidMount() {
    document.activeElement.addEventListener('keydown', this.handleKeydown);

    const items = document.querySelectorAll('.items');
    console.log('Items - ', items)

    for (let i=0; i<items.length;i++) {
      let item = items[i]

      item.addEventListener("click", function(e) {
          console.log('Clicked')
      });
    }

    // items.map((item, index) => (
    //
    // ))

    // const parent = document.querySelector(".items");

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

    constructor() {
        super();
        this.state = {
          selectedIndex: null,
          selectedValue: null,
          options: ["option 0", "option 1", "option 2", "option 3"],
          tabIndex: -1
        };
    }

    toggleRadioBtn(index) {
        this.setState({
          selectedIndex: index,
          selectedValue: this.state.options[index],
          options: this.state.options
        });
    }

    render() {

        const { options } = this.state;

        const allOptions = options.map((option, i) => {
            return <RadioBtn className="items" tabIndex={i+1} key={i} isChecked={(this.state.selectedIndex == i)} text={option} value={option} index={i} handler={this.toggleRadioBtn.bind(this)} />
        });

        return (
            <div>{allOptions}</div>
        );
    }
}

export default RadioGrp
