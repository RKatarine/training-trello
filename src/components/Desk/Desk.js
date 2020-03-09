import React from "react";
import Section from "../Section";
import styles from "./Desk.module.css";

const Desk = ({ sections, onChangeSection }) => {
  return (
    <div className={styles.board}>
      <div className={styles.wrapper}>
        {sections.map(section => (
          <Section
            key={section.id}
            {...section}
            onChangeSection={onChangeSection}
          ></Section>
        ))}
      </div>
    </div>
  );
};

Desk.defaultProps = {
  sections: []
};

export default Desk;
