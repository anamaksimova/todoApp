import {createRow} from './createElements.js';


export const getStorage = (key) => {
  let data = [];
  if (JSON.parse(localStorage.getItem(key)) != null) {
    data = JSON.parse(localStorage.getItem(key));
  }
  return data;
};


export const setStorage = (key, task) => {
  const data = getStorage(key);
  data.push(task);
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeRow = (key, title) => {
  const tasks = getStorage(title);
  for (let i = 0; i < tasks.length; i++) {
    const {id, task} = tasks[i];
    if (id === key) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem(title, JSON.stringify(tasks));
};


export const setTitle = (app, title) => {
  sessionStorage.setItem('title', title);
};

export const addTaskPage = (newTask, list) => {
  const {id, task} = newTask;
  list.append(createRow({id, task}));
};

