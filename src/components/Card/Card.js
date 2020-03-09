import React from "react";
import styles from "./Card.module.css";

const Card = ({ text }) => (
  <div className={styles.card}>
    <p className={styles.p}>{text}</p>
  </div>
);
Card.defaultProps = {
  text: "1212"
};

export default Card;
