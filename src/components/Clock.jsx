import React from "react";
import { Toggle } from "./Toggle";

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
        this.handleClick = this.handleClick.bind(this)
      }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
          );
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
      if(this.props.isOn) {
        this.setState({
          date: new Date()
        });
      }
    }

    handleClick() {
      this.setState(prevState => ({
          isOn: !prevState.isOn
      }));
    }

    render() {
      return (
        <div>
          <h1>Clock</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }