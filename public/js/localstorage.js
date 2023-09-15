let tasksArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

let taskIdSelected = "";
let current = ""
let taskIdSelectedArray = [];
let checkIdSelectedArray = [];

const activeTask = (t) => {
  current = getTask(t);
  console.log(current)
  localStorage.setItem("currentTask", JSON.stringify(current));
}

const getTask = (t) => {
  let task = null;
  tasksArray.forEach((element) => {
    if (element.id == t) task = element;
  });
  return task;
};

const getCheck = (t, c) => {
  let check = null;
  getTask(t).checklist.forEach((obj) => {
    if (obj.id == c) check = obj;
  });
  return check;
};

const storeTask = (title) => {
  const taskObj = {
    id: `task-${tasksArray.length}`,
    title: `${title}`,
    completed: false,
    checklist: [],
  };
  tasksArray.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

const storeChecklist = (title, taskId) => {
  const checklistObj = {
    id: `check-${getTask(taskId).checklist.length}`,
    title: `${title}`,
    completed: false,
  };
  getTask(taskId).checklist.push(checklistObj);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

const deleteTask = (taskId) => {
  let tasksArrayCopy = [];
  for (let index = 0; index < tasksArray.length; index++) {
    const task = tasksArray[index];
    if (task.id != taskId) tasksArrayCopy.push(task);
  }
  tasksArray = tasksArrayCopy;
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  location.reload();
};

const deleteAll = () => {
  localStorage.setItem("tasks", JSON.stringify([]));
  location.reload();
};

const updateStatus = (taskId) => {
  for (let index = 0; index < tasksArray.length; index++) {
    const task = tasksArray[index];
    if (task.id == taskId) task.completed = true;
  }
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

const updateCheckStatus = (check) => {
  check.completed = true;
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

const deleteCheckItem = (taskId, checkIdDelete) => {
  const task = getTask(taskId);
  let checklistCopy = [];
  for (let index = 0; index < task.checklist.length; index++) {
    const check = task.checklist[index];
    if (check.id != checkIdDelete) checklistCopy.push(check);
  }
  task.checklist = checklistCopy;
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};
