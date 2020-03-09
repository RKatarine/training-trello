import React from "react";
import Card from "../Card";
import styles from "./Section.module.css";

const Section = ({
  id,
  cards,
  title,
  onAddCard,
  onEditCard,
  draggedCardInfo,
  setDraggedCardInfo
}) => {
  return (
    <section className={styles.section}>
      <header className={styles.section__header}>{title}</header>
      <div className={styles.body}>
        {cards.map(card => (
          <Card
            isActive={
              draggedCardInfo &&
              draggedCardInfo.cardId === card.id &&
              draggedCardInfo.sectionId === id
            }
            onClick={() => {
              return setDraggedCardInfo(
                draggedCardInfo && card.id === draggedCardInfo.cardId
                  ? null
                  : {
                      sectionId: id,
                      cardId: card.id
                    }
              );
            }}
            onEditCard={onEditCard}
            key={card.id}
            {...card}
          />
        ))}
      </div>
      <footer>
        <button onClick={onAddCard} className={styles.add__card}>
          Добавить карточку...
        </button>
      </footer>
    </section>
  );
};

Section.defaultProps = {
  cards: [],
  draggedCardInfo: {
    cardId: null,
    sectionId: null
  },
  setDraggedCardInfo: () => {}
};

export default Section;
