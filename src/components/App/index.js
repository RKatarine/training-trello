import React, { Component } from "react";
import withLocalStorage from "../../hocs/withLocalStorage";
import App from "./App";
import { observer } from "mobx-react";

import { appStore } from "../../store/index";

function withAppAction(ComposedComponent) {
  class AppProps extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { sections, setSections } = appStore;
      return (
        <ComposedComponent sections={sections} setSections={setSections} />
      );
    }
  }

  return observer(AppProps);
}

export default withAppAction(App);
