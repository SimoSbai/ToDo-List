import { useContext, useState } from "react";
import { Data } from "./TodoList";
import PopupHere from "./popup";
import modifyIcon from "../assets/images/modifyIcon.svg";

function ListOfTasks() {
  const { input } = useContext(Data);
  const [isOpen, setIsOpen] = useState(false);
  const [TaskDetails, setTaskDetails] = useState("");

  const handleOpenPopup = (clickedTaskDetails) => {
    setIsOpen(true);
    setTaskDetails(clickedTaskDetails);
  };
  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ul>
        {input.map((e, i) => {
          return (
            <div className="mainDiv" id={e.id} key={i}>
              <div
                style={
                  e.status === "Completed"
                    ? {
                        backgroundColor: "#E8FFF1 ",
                        borderColor: "#2E8645",
                        color: "#2E8645",
                      }
                    : e.status === "In Progress"
                    ? {
                        backgroundColor: "#FFF4E8",
                        borderColor: "#DF8924",
                        color: "#DF8924",
                      }
                    : { backgroundColor: "white" }
                }
                className="task"
              >
                <li>{e.task}</li>
                <span
                  style={
                    e.status === "Completed"
                      ? { backgroundColor: "green" }
                      : e.status === "In Progress"
                      ? { backgroundColor: "orange" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  {e.status}
                </span>
              </div>
              <img
                onClick={() => handleOpenPopup(e)}
                style={{
                  padding: "8px",
                  backgroundColor: "black",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                src={modifyIcon}
                alt="Modify"
              />
            </div>
          );
        })}
      </ul>
      <PopupHere
        isOpen={isOpen}
        isClose={handleClosePopup}
        clickedTaskDetails={TaskDetails}
      />
    </div>
  );
}

export default ListOfTasks;
