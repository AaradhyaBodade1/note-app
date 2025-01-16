import React, { useContext } from "react";
import styles from "../../../../styles/selectednotes.module.css";
import AppContext from "../../../../context/AppContext";

function NoteHeading({ noteHeading }) {
  const { isMobile, setHide, setCurrentGroup } = useContext(AppContext);
  const { letters, name, color } = noteHeading;

  const handleClick = () => {
    setCurrentGroup(noteHeading);
    if (isMobile) {
      setHide(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={styles.groupName}
      key={name} // Move key to the root div if part of a list rendering
    >
      <div className={styles.icon} style={{ backgroundColor: color }}>
        {letters}
      </div>
      <div>{name}</div>
    </div>
  );
}

export default NoteHeading;
