import { createContext, useState } from "react";
import "../assets/style.css";
import AddNewTasks from "./AddNewTasks";

export const Data = createContext();

function TodoList() {
  const [input, setInput] = useState(
    window.localStorage.getItem("tasks")
      ? JSON.parse(window.localStorage.getItem("tasks"))
      : []
  );

  const updatedTaskStatus = (taskId, newStatus) => {
    const updatedTask = input.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setInput(updatedTask);
    window.localStorage.setItem("tasks", JSON.stringify(updatedTask));
  };

  const updatedTaskName = (nameId, newStatus, newName) => {
    const updatedName = input.map((task) =>
      task.id === nameId ? { ...task, status: newStatus, task: newName } : task
    );
    setInput(updatedName);
    window.localStorage.setItem("tasks", JSON.stringify(updatedName));
  };

  return (
    <div>
      <Data.Provider
        value={{ input, setInput, updatedTaskStatus, updatedTaskName }}
      >
        <AddNewTasks />
      </Data.Provider>
    </div>
  );
}

export default TodoList;
