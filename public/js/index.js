window.addEventListener("load", (event) => {
  displayTasks(tasksArray);
  if (tasksArray && tasksArray.length)
    activateTask(tasksArray[tasksArray.length - 1]);
});

const progressBar = () =>
{
  const tasksDone = countTasksDone();
  if (tasksArray.length && tasksDone) 
    document.getElementById("bar").parentNode.classList.remove("hidden");
  const currentWidth = document.getElementById("bar").clientWidth;
  const total = tasksArray.length;
  const width = tasksDone / total * currentWidth;
  const percentage = width / currentWidth * 100;
  document.getElementById("bar").style.width = `${width}px`;
  // console.log(percentage);
  let bg = "";
  if (percentage >= 75) {
    bg = "bg-green-500";
  } else if (percentage >= 50) {
    bg = "bg-yellow-500";
  } else if (percentage >= 25) {
    bg = "bg-orange-500";
  } else {
    bg = "bg-red-500";
  }
  document.getElementById("bar").classList.add(bg);
}

const selectTask = (t) => taskIdSelectedArray.push(t);
const selectCheck = (c) => checkIdSelectedArray.push(c);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const markTaskComplete = (span, t) => {
  span.classList.add("line-through");
  updateStatus(t);
  location.reload();
};

const doneAllTasks = () =>
  tasksArray.forEach((element) =>
    markTaskComplete(
      document.getElementById(element.id).querySelector("span"),
      element.id
    )
  );

const doneSelectedTasks = () =>
  taskIdSelectedArray.forEach((t) =>
    markTaskComplete(document.getElementById(t).querySelector("span"), t)
  );

const markCheckComplete = (span, c) => {
  span.classList.add("line-through");
  updateCheckStatus(c);
};

const deleteItem = (parent, child) => {
  deleteTask(child.id);
  parent.removeChild(child);
};

const deleteSelectedTask = () =>
  taskIdSelectedArray.forEach((t) =>
    deleteItem(document.getElementById("taskList"), document.getElementById(t))
  );

const deleteCheck = (parent, child) => {
  parent.removeChild(child);
  deleteCheckItem(taskIdSelected, child.id);
};

const deleteAllCheck = () =>
  getTask(taskIdSelected).checklist.forEach((check) =>
    deleteCheck(
      document.getElementById("checkList"),
      document.getElementById(check.id)
    )
  );

const deleteSelectedCheck = () =>
  checkIdSelectedArray.forEach((c) =>
    deleteCheck(
      document.getElementById("checkList"),
      document.getElementById(c)
    )
  );

const doneAllChecks = () =>
  getTask(taskIdSelected).checklist.forEach((c) =>
    markCheckComplete(document.getElementById(c.id).querySelector("span"), c)
  );

const doneSelectedChecks = () =>
  checkIdSelectedArray.forEach((c) =>
    markCheckComplete(
      document.getElementById(c).querySelector("span"),
      getCheck(taskIdSelected, c)
    )
  );

const activateTask = (item) => {
  taskIdSelected = item.id;
  activeTask(item.id);
  const children = document.getElementById("taskList").children;
  for (let index = 0; index < children.length; index++) {
    const element = children[index];
    taskIdSelected == element.id
      ? element.classList.add("bg-blue-400")
      : element.classList.remove("bg-blue-400");
  }
  displayChecklist(getTask(taskIdSelected).checklist);
};

const showModal = (modalId) =>
  document.getElementById(modalId).classList.remove("hidden");

const hideModal = (modalId) =>
  document.getElementById(modalId).classList.add("hidden");

document
  .getElementById("newTaskBtn")
  .addEventListener("click", () => showModal("newTaskModal"));

document
  .getElementById("newChecklistBtn")
  .addEventListener("click", () => showModal("newChecklistModal"));

document.getElementById("cancelbtn").addEventListener("click", () => {
  hideModal("newTaskModal");
});

document
  .getElementById("cancelChecklistModal")
  .addEventListener("click", () => hideModal("newChecklistModal"));

document
  .getElementById("taskOptions")
  .addEventListener("click", () =>
    document.getElementById("optionstasks").classList.contains("hidden")
      ? showModal("optionstasks")
      : hideModal("optionstasks")
  );

document
  .getElementById("checklistOptions")
  .addEventListener("click", () =>
    document.getElementById("optionschecklist").classList.contains("hidden")
      ? showModal("optionschecklist")
      : hideModal("optionschecklist")
  );

const addTask = () => {
  storeTask(document.getElementById("taskInput").value);
  currentTask = tasksArray[tasksArray.length - 1];
  displayTasks(tasksArray);
  document.getElementById("taskInput").value = "";
  activateTask(tasksArray[tasksArray.length - 1]);
};

const addChecklist = () => {
  storeChecklist(
    document.getElementById("checklistInput").value,
    taskIdSelected
  );
  displayChecklist(getTask(taskIdSelected).checklist);
};

const displayTasks = (taskArray) => {
  progressBar();
  const taskList = document.getElementById("taskList");
  removeAllChildNodes(taskList);
  if (taskArray && taskArray.length)
    document.getElementById("no-task").classList.add("hidden");
  taskArray.forEach((item) => {
    const listItem = document.createElement("li");
    const listWrapper = document.createElement("div");
    const titleWrapper = document.createElement("div");
    const buttonsWrapper = document.createElement("div");
    const checkBox = document.createElement("input");
    const taskTitle = document.createElement("span");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    buttonsWrapper.appendChild(completeButton);
    buttonsWrapper.appendChild(deleteButton);
    listItem.id = item.id;
    taskTitle.textContent = `${item.title}`;
    checkBox.setAttribute("type", "checkbox");
    completeButton.innerHTML = "<span class=''>&#10004;</span>";
    deleteButton.innerHTML = "<span class=''>&#10060;</span>";

    taskTitle.addEventListener("click", () => activateTask(listItem));

    checkBox.addEventListener("click", () => selectTask(`${item.id}`));

    // list wrapper classes
    listWrapper.setAttribute("class", "flex justify-between p-2");

    // task title
    taskTitle.setAttribute("class", "cursor-pointer");

    // span (title)
    if (item.completed) taskTitle.classList.add("line-through");

    //buttons classes
    completeButton.setAttribute("class", "bg-blue-300 mx-1");
    deleteButton.setAttribute("class", "bg-yellow-100 mx-1");

    // buttons functionality
    completeButton.addEventListener("click", () =>
      markTaskComplete(taskTitle, `${item.id}`)
    );
    deleteButton.addEventListener("click", () =>
      deleteItem(taskList, listItem)
    );

    titleWrapper.appendChild(checkBox);
    titleWrapper.appendChild(taskTitle);

    listWrapper.appendChild(titleWrapper);
    listWrapper.appendChild(buttonsWrapper);

    listItem.appendChild(listWrapper);
    taskList.appendChild(listItem);
  });
};

const displayChecklist = (checklistArray) => {
  checklistArray && checklistArray.length
    ? document.getElementById("no-checklist").classList.add("hidden")
    : document.getElementById("no-checklist").classList.remove("hidden");
  const checkList = document.getElementById("checkList");
  removeAllChildNodes(checkList);
  checklistArray.forEach((item) => {
    const listItem = document.createElement("li");
    const listWrapper = document.createElement("div");
    const titleWrapper = document.createElement("div");
    const buttonsWrapper = document.createElement("div");
    const checkBox = document.createElement("input");
    const checkTitle = document.createElement("span");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    listItem.id = item.id;
    checkTitle.textContent = `${item.title}`;
    checkBox.setAttribute("type", "checkbox");
    completeButton.innerHTML = "<span class=''>&#10004;</span>";
    deleteButton.innerHTML = "<span class=''>&#10060;</span>";

    checkBox.addEventListener("click", () => selectCheck(`${item.id}`));

    // list wrapper classes
    listWrapper.setAttribute("class", "flex justify-between p-2");

    if (item.completed) checkTitle.classList.add("line-through");

    //buttons classes
    completeButton.setAttribute("class", "bg-blue-300 mx-1");
    deleteButton.setAttribute("class", "bg-yellow-100 mx-1");

    // buttons functionality
    completeButton.addEventListener("click", () =>
      markCheckComplete(checkTitle, item)
    );
    deleteButton.addEventListener("click", () =>
      deleteCheck(checkList, listItem)
    );

    buttonsWrapper.appendChild(completeButton);
    buttonsWrapper.appendChild(deleteButton);

    titleWrapper.appendChild(checkBox);
    titleWrapper.appendChild(checkTitle);

    listWrapper.appendChild(titleWrapper);
    listWrapper.appendChild(buttonsWrapper);

    listItem.appendChild(listWrapper);
    checkList.appendChild(listItem);
  });
};
