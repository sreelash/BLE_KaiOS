import React from 'react'
import ReactDOM from 'react-dom'

class RadioBtn extends React.Component {

    constructor(props) {
        super(props);

        console.log('Constructor tabindex ', props.tabIndex)

        this.state = {
          tabIndex: props.tabIndex
        };
    }

    componentDidMount() {
      // console.log('Comp mount tabindex - ', this.state.tabIndex.toString())
      // const div = document.querySelector('.items');
      // const index = this.state.tabIndex.toString()
      // const div = document.getElementById(index)

      // console.log('Comp mount div querySelector - ', div)
      // div.addEventListener('click', this.handleClick);

      // document.activeElement.addEventListener('keydown', this.handleKeydown)

      // console.log('Element - 1', document.getElementById("1"))
      //
      // document.getElementById("1").addEventListener("click", function() {
      //   console.log('Click detected')
      //   // document.getElementById("name").innerHTML = "Hello World!";
      // });

      // document.body.addEventListener('click', function (event) {
      //   console.log('Clicked')
      // });
    }

    componentWillUnmount() {
      // div.removeEventListener('click', this.handleClick);
      // document.removeEventListener('keydown', this.handleKeydown);
    }

    //

    handleClick(event){
      console.log('Radio button handler clicked - ', event)
      // this.props.handler(this.props.index);
    }

    render() {
      // console.log('Render tabindex ', this.state.tabIndex.toString())
        return (
            <div className="items" tabIndex={this.state.tabIndex} id={this.state.tabIndex.toString()}>
                <div className={this.props.isChecked ? "radiobtn checked" : "radiobtn unchecked"} data-value={this.props.value}></div>
                <label>{this.props.text}</label>
            </div>
        );
    }
}

export default RadioBtn
