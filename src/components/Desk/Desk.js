import React from "react";
import Section from "../Section/Section";
import styles from "./Desk.module.css";

const Desk = ({ sections }) => {
  console.log(styles);
  return (
    <div className={styles.board}>
      <div className={styles.wrapper}>
        {sections.map(section => (
          <Section key={section.id} {...section}></Section>
        ))}
      </div>
    </div>
  );
};

Desk.defaultProps = {
  sections: []
};

export default Desk;
