import React from "react";
import styles from "./CardEditor.module.css";

const CardEditor = ({ text, onChange, onSave }) => (
  <div className={styles.cardEditor}>
    <input
      className={styles.cardEditorInput}
      type="text"
      defaultValue={text}
      onChange={onChange}
    />
    <button className={styles.cardEditorBtn} onClick={onSave}>
      Save
    </button>
  </div>
);

export default CardEditor;
