import nanoid from "nanoid";
import { compose, withHandlers, withState, mapProps } from "recompose";
import Section from "./Section";

export default compose(
  withState("cards", "setCards", prop => prop.cards),
  withHandlers({
    onAddCard: props => (card = {}) => {
      const id = nanoid();
      const newCards = [...props.cards, { ...card, id }];
      props.setCards(newCards);
    },
    onEditCard: ({ cards, setCards }) => editedCardData => {
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
      setCards(newCards);
    }
  }),
  mapProps(({ setCards, ...props }) => props)
)(Section);
