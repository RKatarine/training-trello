import { decorate, observable, action } from "mobx";
import nanoid from "nanoid";

const LEFT_KEY = 37;
const RIGHT_KEY = 39;

class Section {
  constructor() {
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
}

decorate(Section, {
  setCards: action,
  onAddCard: action,
  onEditCard: action
});

export const section = new Section();
