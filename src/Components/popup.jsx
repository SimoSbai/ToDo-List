import { createPortal } from "react-dom";
import closeIcon from "../assets/images/Cross.svg";
import { Data } from "./TodoList";
import { useContext, useState } from "react";

function PopupHere({ isOpen, isClose, clickedTaskDetails }) {
  const { updatedTaskStatus } = useContext(Data);
  const { updatedTaskName } = useContext(Data);
  const { input } = useContext(Data);
  const [changeName, setChangeName] = useState("");

  const popupIsOpen = {
    display: isOpen ? "grid" : "none",
  };

  const handleClosePopup = () => isClose();

  const updateTask = () => {
    const selected = document.querySelector("#status");
    const yourTaskStatus = selected.options[selected.selectedIndex].textContent;
    updatedTaskStatus(clickedTaskDetails.id, yourTaskStatus);
    if (changeName !== "") {
      updatedTaskName(clickedTaskDetails.id, yourTaskStatus, changeName);
    }
    setChangeName("");
    handleClosePopup();
  };

  const deleteTask = () => {
    const taskIndex = input.findIndex(
      (task) => task.id === clickedTaskDetails.id
    );
    if (taskIndex !== -1) {
      input.splice(taskIndex, 1);
      window.localStorage.setItem("tasks", JSON.stringify(input)); // Save to local storage
    }
    handleClosePopup();
  };

  const changeNameHere = (e) => {
    setChangeName(e.target.value);
  };

  return createPortal(
    <div style={popupIsOpen} className="popupContainer">
      <div className="popupCard">
        <h1>Card Details</h1>
        <p style={{ fontWeight: "600", color: "rgb(169, 169, 169)" }}>
          Name: {clickedTaskDetails.task}
        </p>

        <hr
          style={{
            height: "1px",
            backgroundColor: "rgb(169, 169, 169)",
            border: "none",
          }}
        />

        <label className="label">
          Change Name
          <input
            type="text"
            placeholder="New Name..."
            onChange={changeNameHere}
            value={changeName}
          />
        </label>
        <label className="label">
          Change Status
          <select name="status" id="status">
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <div className="buttons">
          <button className="btn1" onClick={updateTask}>
            Done
          </button>
          <button className="btn2" onClick={deleteTask}>
            Delete
          </button>
        </div>
        <img
          src={closeIcon}
          alt="close Popup"
          className="close"
          onClick={handleClosePopup}
        />
      </div>
    </div>,
    document.querySelector("#popup_Content")
  );
}

export default PopupHere;
