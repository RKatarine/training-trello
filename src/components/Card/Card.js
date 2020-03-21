import React from "react";
import CardEditor from "../CardEditor";
import EditIcon from "../common/icons/EditIcon";
import styles from "./Card.module.css";

const Card = ({
  text,
  setEditingMode,
  showEditButton,
  isActive,
  onClick,
  isEditing,
  onChange,
  onSave,
  onMouseLeave,
  onMouseEnter,
  ...props
}) => {
  return (
    <div>
      {isEditing ? (
        <CardEditor text={text} onChange={onChange} onSave={onSave} />
      ) : (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          className={isActive ? styles.active : styles.card}
        >
          <p className={styles.p}>{text}</p>
          {showEditButton && (
            <button onClick={setEditingMode} className={styles.edit__button}>
              <EditIcon className={styles.icon} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
Card.defaultProps = {
  text: "1212",
  showEditButton: false,
  isEditing: false
};

export default Card;
