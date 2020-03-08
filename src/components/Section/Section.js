import React from "react";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const Section = ({ cards, title }) => (
  <section className={styles.section}>
    <header className={styles.section__header}>{title}</header>
    <div className={styles.body}>
      {cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
    <footer>
      <button className={styles.add__card}>Добавить карточку...</button>
    </footer>
  </section>
);

Section.defaultProps = {
  cards: []
};

export default Section;
