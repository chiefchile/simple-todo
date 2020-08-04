import React, { Component } from "react";
import IResult from "./result";

interface Props {
  result: IResult | null;
  isShort: boolean;
}

interface State {
  style: string;
}

export class Message extends Component<Props, State> {
  state = {
    style: ""
  };

  componentDidMount() {
    this.setStyle();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.result !== prevProps.result) {
      this.setStyle();
    }
  }

  setStyle() {
    if (this.props.result) {
      let style = null;
      if (this.props.isShort) {
        style = "alert short-alert-fixed ";
      } else {
        style = "alert long-alert-fixed ";   
      }

      if (this.props.result.wasSuccessful()) {
        style += "alert-success";
      } else {
        style += "alert-danger";
      }
      this.setState({ style: style });
      this.addFadeOutStyle();
    }
  }

  addFadeOutStyle() {
    setTimeout(() => {
      let style = this.state.style;
      this.setState({ style: style + " fade-out" });
    }, 3000);
  }

  render() {
    if (this.props.result) {
      return (
        <div className={this.state.style} role="alert">
          {this.props.result.msg}
        </div>
      );
    } else {
      return <div />;
    }
  }
}
