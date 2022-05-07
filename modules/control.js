
import {
  renederTodoApp,
  renderTasks,
} from './render.js';

import {
  getStorage,
  setStorage,
  removeRow,
  setTitle,
  addTaskPage,
} from './service.js';

export const closeModal = (authOverlay) => {
  authOverlay.classList.remove('show');
  authOverlay.style.display = 'none';
  authOverlay.setAttribute('arial-hidden', 'true');
  authOverlay.removeAttribute('arial-modal', 'true');
  const body = document.querySelector('body');
  body.classList.remove('modal-open');
  body.style.overflow = '';
};
export const authModalControl = (authOverlay) => {
  const openModal = () => {
    authOverlay.classList.add('show');
    authOverlay.style.display = 'block';
    authOverlay.removeAttribute('arial-hidden');
    authOverlay.setAttribute('arial-modal', 'true');
    const body = document.querySelector('body');
    body.classList.add('modal-open');
    body.style.overflow = 'hidden';
  };


  document.querySelector('.btn-close').addEventListener('click', () => {
    closeModal(authOverlay);
  });

  return {
    openModal,
  };
};
export const authFormControl = (app, authForm, authOverlay) => {
  authForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputNameAuth = document.querySelector('.auth-control');
    setTitle(app, inputNameAuth.value);
    secondStep(app, inputNameAuth.value);
    closeModal(authOverlay);
  });
};


export const formControl = (form, list, title) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputName = document.querySelector('.input-form');

    if (inputName.value === '' || (/^\s+$/.test(inputName.value))) {
      inputName.value = '';
    } else {
      const id = Math.random().toString().substring(2, 10);
      const newTask = {
        id,
        task: inputName.value,
      };
      setStorage(title, newTask);
      addTaskPage(newTask, list);
    }
    inputName.value = '';
  });

  form.addEventListener('reset', e => {
    e.preventDefault();
    localStorage.clear();
    const rows = document.querySelectorAll('.table-rows');
    for (const row of rows) {
      row.remove();
    }
  });
};

export const tableControl = (list, title) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const btnDelItems = document.querySelectorAll('.btn-danger');
    const btnDones = document.querySelectorAll('.btn-success');
    for (let index = 0; index < btnDelItems.length; index++) {
      const btnDelItem = btnDelItems[index];
      if (btnDelItem === target) {
        const rowDelete = target.closest('.table-rows').dataset.id;
        target.closest('.table-rows').remove();
        removeRow(rowDelete, title);
        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }
        renderTasks(list, getStorage(title));
      }
    }

    for (let index = 0; index < btnDones.length; index++) {
      const btnDone = btnDones[index];
      if (target === btnDone) {
        const row = target.closest('.table-rows');
        row.classList.remove('table-light');
        row.classList.add('table-success');
        row.children[1].classList.add('text-decoration-line-through');
        row.children[2].textContent = 'Выполнена';
      }
    }
  });
};
export const secondStep = (app, title) => {
  const {
    list,
    form,
  } = renederTodoApp(app, title);

  const allRow = renderTasks(list, getStorage(title));
  tableControl(list, title);
  formControl(form, list, title);
};

