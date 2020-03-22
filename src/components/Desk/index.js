import React, { Component } from "react";
import Desk from "./Desk";
import { observer } from "mobx-react";

import { appStore } from "../../store";

function withDeskAction(ComposedComponent) {
  class DeskProps extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const {
        changeCardSection,
        onChangeSection,
        setDraggedCardInfo,
        draggedCardInfo
      } = appStore;
      return (
        <ComposedComponent
          {...this.props}
          changeCardSection={changeCardSection}
          onChangeSection={onChangeSection}
          draggedCardInfo={draggedCardInfo}
          setDraggedCardInfo={setDraggedCardInfo}
        />
      );
    }
  }

  return observer(DeskProps);
}

export default withDeskAction(Desk);
