import React, { useContext, useEffect, useState } from "react";
import styles from "../../../../styles/selectednotes.module.css";
import { FaPlus } from "react-icons/fa";
import AppContext from "../../../../context/AppContext";

function CreateNote() {
  const { modal, toggleModal, setNoteHeadings } = useContext(AppContext);
  const [grpName, setGrpName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState(null); // `null` by default, more meaningful error state

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  function randomLetters(s) {
    if (!s) {
      return "NA";
    }

    const words = s.split(" ");
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase(); // First two letters of a single word
    } else {
      // Get two random letters from the words
      const firstIndex = Math.floor(Math.random() * words.length);
      const secondIndex =
        (firstIndex + 1 + Math.floor(Math.random() * (words.length - 1))) %
        words.length;
      return (words[firstIndex][0] + words[secondIndex][0]).toUpperCase(); // Combine the first letters
    }
  }

  const addNote = () => {
    if (grpName && selectedColor) {
      const letters = randomLetters(grpName);
      setNoteHeadings((prevNoteHeadings) => [
        ...prevNoteHeadings,
        {
          name: grpName,
          color: selectedColor,
          letters,
          notes: [],
        },
      ]);
      toggleModal();
      setGrpName("");
      setSelectedColor("");
      setError(null); // Reset the error state after successful addition
    } else {
      setError("Please fill in both fields.");
    }
  };

  useEffect(() => {
    if (modal) {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setGrpName("");
          setSelectedColor("");
          setError(null); // Reset the error state when modal is closed
          toggleModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [modal, toggleModal]);

  const handleClickOutside = (event) => {
    if (event.target.classList.contains(styles.modal)) {
      toggleModal();
      setGrpName("");
      setSelectedColor("");
      setError(null); // Reset error when modal is closed outside
    }
  };

  return (
    <>
      <button className={styles.button} onClick={toggleModal}>
        <FaPlus size="1em" />
        Create Notes group
      </button>
      {modal && (
        <div className={styles.modal} onClick={handleClickOutside}>
          <div className={styles.modalContent}>
            <h3>Create New Notes</h3>
            <div>
              <label>Group Name</label>
              <input
                type="text"
                value={grpName}
                onChange={(e) => setGrpName(e.target.value)}
                placeholder="Enter your group name...."
              />
            </div>
            <div className={styles.colorComp}>
              <label>Choose color</label>
              <div>
                {colors.map((color) => {
                  const colorId = color.replace("#", "");
                  return (
                    <div
                      id={colorId}
                      key={colorId}
                      onClick={() => setSelectedColor(color)}
                      className={`${styles.color} ${
                        selectedColor === color ? styles.selected : ""
                      }`}
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <button onClick={addNote} disabled={!grpName || !selectedColor}>
              Create
            </button>
            {error && (
              <label style={{ marginTop: "-.5rem", color: "red" }}>
                {error}
              </label>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNote;
