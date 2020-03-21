import React, { Component } from "react";
import Desk from "./Desk";

const LEFT_KEY = 37;
const RIGHT_KEY = 39;

function withDeskAction(ComposedComponent) {
  class DeskProps extends Component {
    constructor(props) {
      super(props);
      this.state = {
        draggedCardInfo: null
      };
      this.setDraggedCardInfo = this.setDraggedCardInfo.bind(this);
      this.onChangeSection = this.onChangeSection.bind(this);
      this.changeCardSection = this.changeCardSection.bind(this);
    }

    setDraggedCardInfo(newDraggedCardInfo) {
      this.setState({ draggedCardInfo: newDraggedCardInfo });
    }

    onChangeSection(editedSection) {
      const { sections, setSections } = this.props;
      const editedSectionIndex = sections.findIndex(
        section => section.id === editedSection.id
      );
      if (editedSectionIndex === -1) {
        return;
      }
      const newSections = [
        ...sections.slice(0, editedSectionIndex),
        { ...sections[editedSectionIndex], ...editedSection },
        ...sections.slice(editedSectionIndex + 1)
      ];
      setSections(newSections);
    }

    changeCardSection({ keyCode }) {
      const { props } = this;
      const { draggedCardInfo } = this.state;
      if (!draggedCardInfo) {
        return;
      }
      const currentSectionIndex = props.sections.findIndex(
        section => section.id === draggedCardInfo.sectionId
      );
      const cardIndex = props.sections[currentSectionIndex].cards.findIndex(
        card => card.id === draggedCardInfo.cardId
      );
      let nextSectionIndex = 0;
      if (keyCode === LEFT_KEY && currentSectionIndex !== 0) {
        nextSectionIndex = currentSectionIndex - 1;
      }
      if (
        keyCode === RIGHT_KEY &&
        currentSectionIndex !== props.sections.length - 1
      ) {
        nextSectionIndex = currentSectionIndex + 1;
      }
      if (currentSectionIndex === nextSectionIndex) {
        return;
      }
      let nextSection = props.sections[nextSectionIndex];
      let currentSection = props.sections[currentSectionIndex];
      nextSection = {
        ...nextSection,
        cards: [...nextSection.cards, currentSection.cards[cardIndex]]
      };
      currentSection = {
        ...currentSection,
        cards: currentSection.cards.filter((_, index) => index !== cardIndex)
      };
      const newSections =
        nextSectionIndex > currentSectionIndex
          ? [
              ...props.sections.slice(0, currentSectionIndex),
              currentSection,
              ...props.sections.slice(
                currentSectionIndex + 1,
                nextSectionIndex
              ),
              nextSection,
              ...props.sections.slice(nextSectionIndex + 1)
            ]
          : [
              ...props.sections.slice(0, nextSectionIndex),
              nextSection,
              ...props.sections.slice(
                nextSectionIndex + 1,
                currentSectionIndex
              ),
              currentSection,
              ...props.sections.slice(currentSectionIndex + 1)
            ];
      this.setDraggedCardInfo({
        cardId: draggedCardInfo.cardId,
        sectionId: nextSectionIndex
      });
      props.setSections(newSections);
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          changeCardSection={this.changeCardSection}
          onChangeSection={this.onChangeSection}
          draggedCardInfo={this.state.draggedCardInfo}
          setDraggedCardInfo={this.setDraggedCardInfo}
        />
      );
    }
  }

  return DeskProps;
}

export default withDeskAction(Desk);
