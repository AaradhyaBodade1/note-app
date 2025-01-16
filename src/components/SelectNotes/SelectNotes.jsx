import React, { useContext } from "react";
import styles from "../../styles/selectednotes.module.css";
import CreateNote from "./subcomponents/CreateNote/CreateNote";
import NoteHeading from "./subcomponents/NoteHeading/NoteHeading";
import AppContext from "../../context/AppContext";

function SelectNotes() {
  const { modal, toggleModal, noteHeadings, hide } = useContext(AppContext);

  return (
    <div className={`${styles.container} ${hide ? styles.hidden : ""}`}>
      <h2>Pocket Notes</h2>
      <CreateNote modal={modal} toggleModal={toggleModal} />
      {noteHeadings.length ? (
        noteHeadings.map((noteHeading) => (
          <NoteHeading key={noteHeading.name} noteHeading={noteHeading} />
        ))
      ) : (
        <p>No note groups available</p>
      )}
    </div>
  );
}

export default SelectNotes;
