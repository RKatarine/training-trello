import React from "react";
import {
  compose,
  withState,
  branch,
  renderComponent,
  mapProps,
  withHandlers,
  renameProp,
  lifecycle
} from "recompose";
import Card from "./Card";
import CardEditor from "../CardEditor";

const withHoverHandling = Component => ({ setShowEditButton, ...props }) => (
  <div
    onMouseEnter={() => setShowEditButton(true)}
    onMouseLeave={() => setShowEditButton(false)}
  >
    <Component {...props} />
  </div>
);

const withShowingEditOnHover = compose(
  withState("showEditButton", "setShowEditButton", false),
  withHoverHandling
);

const withEditing = compose(
  withState("isEditing", "setEditingMode", false),
  renameProp("text", "outerText"),
  withState("text", "onChange", props => props.outerText),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.outerText !== this.props.outerText) {
        nextProps.onChange(nextProps.outerText);
      }
    }
  }),
  withHandlers({
    onSave: ({ id, text, onEditCard, setEditingMode }) => () => {
      onEditCard({ id, text });
      setEditingMode(false);
    }
  }),
  branch(({ isEditing }) => isEditing, renderComponent(CardEditor)),
  mapProps(({ isEditing, ...props }) => props)
);

export default compose(withShowingEditOnHover, withEditing)(Card);
