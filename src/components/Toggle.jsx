import React from "react";

export class Toggle extends React.Component {
    constructor(props) {
      super(props);
      // this.state = {isToggleOn: this.props.isToggleOn};
  
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
  
    async handleClick() {
      await this.props.onStatusChange()
      console.log(this.props.isToggleOn);
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.props.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }