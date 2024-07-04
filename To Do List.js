// Local Storage practise:
let addBtn = document.getElementById("add");
let newTask = document.getElementById("input");
let tasksBox = document.querySelector(".tasks-box");
let delAll = document.getElementById("delAll");

let allTasks = window.localStorage.getItem("tasks")
  ? window.localStorage.getItem("tasks").split(",")
  : [];

if (!window.localStorage.getItem("tasks")) {
  tasksBox.style.display = "none";
  delAll.style.display = "none";
} else if (window.localStorage.getItem("tasks").split(",").length === 1) {
  delAll.style.display = "none";
} else delAll.style.display = "block";

window.localStorage.setItem("tasks", allTasks);
tasksBox.innerHTML = "";
appendding(allTasks);
newTask.focus();
addBtn.onclick = (e) => {
  if (newTask.value) {
    allTasks.push(newTask.value);
    tasksBox.style.display = "flex";
    window.localStorage.setItem("tasks", allTasks);
    newTask.value = "";
  } else e.preventDefault();
};
let delBtn = document.querySelectorAll(".del");
delBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let idx = allTasks.indexOf(e.target.parentElement.firstChild.innerHTML);
    allTasks.splice(idx, 1);
    localStorage.tasks = allTasks;
    window.location.reload();
  });
});
delAll.onclick = () => {
  localStorage.removeItem("tasks");
  window.location.reload();
};

function appendding(arr) {
  for (let i = 0; i < arr.length; i++) {
    let taskValue = document.createTextNode(arr[i]);
    let p = document.createElement("p");
    p.classList.add("text-color");
    p.appendChild(taskValue);
    p.style.color = window.localStorage.getItem("color");
    let delValue = document.createTextNode("Delete");
    let span = document.createElement("span");
    span.classList.add("del");
    span.classList.add("test");
    span.appendChild(delValue);
    let taskDiv = document.createElement("div");
    taskDiv.appendChild(p);
    taskDiv.appendChild(span);
    tasksBox.appendChild(taskDiv);
  }
}

let lis = document.querySelectorAll(".colors li");
let testDiv = document.querySelectorAll(".test");
let textcolor = document.querySelectorAll(".text-color");

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    window.localStorage.setItem("color", e.target.dataset.color);
  });
});

setInterval(() => {
  testDiv.forEach(
    (el) => (el.style.backgroundColor = window.localStorage.getItem("color"))
  );
  textcolor.forEach(
    (el) => (el.style.color = window.localStorage.getItem("color"))
  );
}, 0);
