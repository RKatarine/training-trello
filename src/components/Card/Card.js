import React from "react";
import EditIcon from "../common/icons/EditIcon";
import styles from "./Card.module.css";

const Card = ({
  text,
  setEditingMode,
  showEditButton,
  isActive,
  onClick,
  ...props
}) => {
  return (
    <div onClick={onClick} className={isActive ? styles.active : styles.card}>
      <p className={styles.p}>{text}</p>
      {showEditButton && (
        <button onClick={setEditingMode} className={styles.edit__button}>
          <EditIcon className={styles.icon} />
        </button>
      )}
    </div>
  );
};
Card.defaultProps = {
  text: "1212",
  showEditButton: false
};

export default Card;
