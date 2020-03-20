import React, { Component } from "react";
import sections from "../../stubs/sections";
import withLocalStorage from "../../hocs/withLocalStorage";
import App from "./App";

export default withAppAction(App);

function withAppAction(ComposedComponent) {
  class AppProps extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sections
      };
      this.setSections = this.setSections.bind(this);
    }

    setSections(newSections) {
      this.setState({ sections: newSections });
    }

    render() {
      return (
        <ComposedComponent
          sections={this.state.sections}
          setSections={this.setSections}
        ></ComposedComponent>
      );
    }
  }

  return AppProps;
}
