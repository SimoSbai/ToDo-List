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
let changeNamePopup = document.createElement("div");
let changeNameContainer = document.createElement("div");
let heading = document.createElement("h1");
let changeNameInput = document.createElement("input");
let changeNameButton = document.createElement("button");
heading.append("Change your task name");

function addTasksToArray(yourTask) {
  let mainDiv = document.createElement("div");
  let taskElement = document.createElement("div");
  let taskName = document.createElement("div");
  mainDiv.classList.add("mainDiv");
  taskName.append(yourTask.task);
  taskElement.append(taskName);
  taskElement.classList.add("task");
  taskElement.id = `${yourTask.id}`;
  mainDiv.appendChild(taskElement);
  tasks.appendChild(mainDiv);

  let span = document.createElement("span");
  span.innerHTML = yourTask.status || "";
  taskElement.appendChild(span);

  taskElement.addEventListener("click", (e) => {
    popup.style.cssText = "display:grid";
    named.innerHTML = "";
    named.append(`Name : ${taskName.textContent}`);
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
        mainDiv.remove();
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

  let modifyIcon = document.createElement("img");
  modifyIcon.src = "images/modifyIcon.svg";
  modifyIcon.style.cssText =
    "height : 40px;width : 40px; padding: 8px; background-color:black; border-radius:4px; cursor:pointer";
  mainDiv.appendChild(modifyIcon);

  modifyIcon.onclick = function () {
    changeNameInput.value = "";
    changeNamePopup.classList.add("changeNamePopup");
    changeNameContainer.classList.add("changeNameContainer");
    heading.style.cssText = "font-size:20px; text-align : center";
    changeNameInput.classList.add("changeNameInput");
    changeNameButton.classList.add("changeNameButton");
    changeNameButton.innerHTML = "Save";
    changeNamePopup.style.cssText = "display:grid";
    document.querySelector(".container").appendChild(changeNamePopup);
    changeNamePopup.appendChild(changeNameContainer);
    changeNameContainer.appendChild(heading);
    changeNameContainer.appendChild(changeNameInput);
    changeNameContainer.appendChild(changeNameButton);
    changeNameInput.focus();
    changeNameButton.onclick = function () {
      changeNamePopup.style.cssText = "display:none";
      taskName.innerHTML = "";
      yourTask.task = changeNameInput.value;
      taskName.append(yourTask.task);
      window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    };
  };
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
  } else {
    let timeOut = 3;
    let errorMsg = document.querySelector(".errorMsg");
    errorMsg.style.cssText = "display : block";
    let errorMessage = setInterval(() => {
      timeOut--;
      if (timeOut === 0) {
        clearInterval(errorMessage);
        errorMsg.style.cssText = "display : none";
      }
    }, 1000);
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
