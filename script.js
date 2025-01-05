let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let popup = document.querySelector(".popup");
let named = document.querySelector(".name");
let statut = document.querySelector(".statut");
let button1 = document.querySelector(".btn1");
let button2 = document.querySelector(".btn2");
let arrayOfTasks = [];

// Check data in local storage
function getDataFromLocalStorage() {
  if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
  }
  arrayOfTasks.forEach((yourTask) => {
    addTasksToArray(yourTask);
  });
}

// Add tasks to Page
function addTasksToArray(yourTask) {
  let taskElement = document.createElement("div");
  taskElement.append(yourTask.task);
  taskElement.classList.add("task");
  taskElement.id = `${yourTask.id}`;
  tasks.appendChild(taskElement);

  let span = document.createElement("span");
  span.innerHTML = yourTask.status || "";
  taskElement.appendChild(span);

  taskElement.addEventListener("click", (e) => {
    popup.style.cssText = "display:grid";
    named.innerHTML = "";
    named.append(`Name : ${e.target.firstChild.textContent}`);
    named.style.cssText = "font-weight:600; color: #a9a9a9";

    button1.onclick = () => {
      span.innerHTML = "";
      let selectedOption = statut.options[statut.selectedIndex];
      let selectedText = selectedOption.textContent;
      span.append(selectedText);
      if (selectedText === "Completed") {
        span.style.cssText = "background-color:green";
      } else {
        span.style.cssText = "";
      }
      let taskIndex = arrayOfTasks.findIndex(
        (task) => task.id === parseInt(taskElement.id)
      );
      if (taskIndex !== -1) {
        arrayOfTasks[taskIndex].status = selectedText; // Update status
        window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks)); // Save to local storage
      }
      popup.style.cssText = "display:none";
    };

    button2.onclick = () => {
      let taskIndex = arrayOfTasks.findIndex(
        (task) => task.id === parseInt(taskElement.id)
      );
      if (taskIndex !== -1) {
        arrayOfTasks.splice(taskIndex, 1);
        taskElement.remove();
        window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks)); // Save to local storage
      }
      popup.style.cssText = "display:none";
    };
  });

  if (yourTask.status === "Completed") {
    span.style.cssText = "background-color:green";
  }
  if (yourTask.status === "") {
    span.style.cssText = "background-color:transparent";
  }
}

// Add tasks to Local storage
function addInputToTasks() {
  let data = {
    id: Date.now(),
    task: input.value,
    status: "",
  };
  if (data.task !== "") {
    arrayOfTasks.push(data);
    addTasksToArray(data);
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }
}

add.addEventListener("click", () => {
  addInputToTasks();
  input.value = "";
});

document.onkeyup = (e) => {
  if (e.key === "Enter") {
    addInputToTasks();
    input.value = "";
  }
};

getDataFromLocalStorage();
