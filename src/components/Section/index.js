import React, { Component } from "react";
import nanoid from "nanoid";
import Section from "./Section";

function withSectionAction(ComposedComponent) {
  class SectionAction extends Component {
    constructor(props) {
      super(props);
      this.setCards = this.setCards.bind(this);
      this.onAddCard = this.onAddCard.bind(this);
      this.onEditCard = this.onEditCard.bind(this);
    }

    setCards(cards) {
      const { props } = this;
      props.onChangeSection({
        id: props.id,
        title: props.title,
        cards
      });
    }

    onAddCard() {
      const { props } = this;
      const id = nanoid();
      const newCards = [...props.cards, { id }];
      this.setCards(newCards);
    }

    onEditCard(editedCardData) {
      const { cards } = this.props;
      const editedCardIndex = cards.findIndex(
        card => card.id === editedCardData.id
      );
      if (editedCardIndex === -1) {
        return;
      }
      const newCards = [
        ...cards.slice(0, editedCardIndex),
        {
          ...cards[editedCardIndex],
          ...editedCardData
        },
        ...cards.slice(editedCardIndex + 1)
      ];
      this.setCards(newCards);
    }

    render() {
      return (
        <ComposedComponent
          onEditCard={this.onEditCard}
          onAddCard={this.onAddCard}
          {...this.props}
        />
      );
    }
  }

  return SectionAction;
}

export default withSectionAction(Section);
