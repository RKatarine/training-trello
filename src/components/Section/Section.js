import React from "react";
import Card from "../Card";
import styles from "./Section.module.css";

const Section = ({ cards, title, onAddCard, onEditCard }) => (
  <section className={styles.section}>
    <header className={styles.section__header}>{title}</header>
    <div className={styles.body}>
      {cards.map(card => (
        <Card onEditCard={onEditCard} key={card.id} {...card} />
      ))}
    </div>
    <footer>
      <button onClick={onAddCard} className={styles.add__card}>
        Добавить карточку...
      </button>
    </footer>
  </section>
);

Section.defaultProps = {
  cards: []
};

export default Section;
