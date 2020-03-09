import React from "react";
import Section from "../Section";
import styles from "./Desk.module.css";

const Desk = ({
  sections,
  onChangeSection,
  draggedCardInfo,
  setDraggedCardInfo,
  changeCardSection
}) => {
  return (
    <div className={styles.board} tabIndex="0" onKeyDown={changeCardSection}>
      <div className={styles.wrapper}>
        {sections.map(section => (
          <Section
            key={section.id}
            {...section}
            onChange={onChangeSection}
            draggedCardInfo={draggedCardInfo}
            setDraggedCardInfo={setDraggedCardInfo}
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
