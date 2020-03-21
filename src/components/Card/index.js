import React, { Component } from "react";
import Card from "./Card";

function withCardAction(ComposedComponent) {
  class CardAction extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showEditButton: false,
        isEditing: false,
        text: this.props.text
      };
      this.setShowEditButton = this.setShowEditButton.bind(this);
      this.setEditingMode = this.setEditingMode.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);
    }

    setShowEditButton(newShowEditButton) {
      this.setState({ showEditButton: newShowEditButton });
    }

    setEditingMode(isEditing) {
      this.setState({ isEditing });
    }

    onChange({ target: { value } }) {
      this.setState({ text: value });
    }

    onSave() {
      const { id, text, onEditCard } = this.props;
      onEditCard({ id, text: this.state.text });
      this.setEditingMode(false);
    }

    render() {
      return (
        <ComposedComponent
          onMouseEnter={() => this.setShowEditButton(true)}
          onMouseLeave={() => this.setShowEditButton(false)}
          setEditingMode={this.setEditingMode}
          onSave={this.onSave}
          onChange={this.onChange}
          showEditButton={this.state.showEditButton}
          isEditing={this.state.isEditing}
          {...this.props}
        />
      );
    }
  }

  return CardAction;
}

export default withCardAction(Card);
