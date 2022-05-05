'use strict';
{
  const auth = () => {
    const title = prompt('Назовите ваше имя');
    console.log('title: ', title);
    return title;
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
<tr class="table-light">
<th>№</th>
<th>Задача</th>
<th>Статус</th>
<th>Действие</th>
</tr>
`);
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('d-flex', 'align-items-center', 'mb-3');
    form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
        <input type="text" class="form-control" placeholder="ввести задачу">
    </label>

      <button type="submit" class="btn btn-light me-3">
        Сохранить
      </button>

      <button type="reset" class="btn btn-warning">
        Очистить
      </button>
    `);

    return form;
  };

  // для модального окна авторизации
  //   const createForm = () => {
  //     const overlay = document.createElement('div');
  //     overlay.classList.add('form-overlay');

  //     const form = document.createElement('form');
  //     form.classList.add('form');
  //     form.insertAdjacentHTML('beforeend', `
  //     <button class="close" type="button"></button>
  //     <h2 class="form-title">Добавить контакт</h2>
  //     <div class="form-group">
  //     <label class="form-label" for="name">Имя:</label>
  //     <input class="form-input" name="name" id="name" type="text" required>
  //     </div>
  //     <div class="form-group">
  //     <label class="form-label" for="surname">Фамилия:</label>
  //     <input class="form-input" name="surname" id="surname" type="text" required>
  //     </div>
  //     <div class="form-group">
  //     <label class="form-label" for="phone">Телефон:</label>
  //     <input class="form-input" name="phone" id="phone" type="number" required>
  //     </div>
  //     `);

  //     const buttonGroup = createButtonsGroup([{
  //       className: 'btn btn-primary mr-3',
  //       type: 'submit',
  //       text: 'Добавить',
  //     },
  //     {
  //       className: 'btn btn-danger',
  //       type: 'reset',
  //       text: 'Отмена',
  //     },
  //     ]);
  //     form.append(...buttonGroup.btns);
  //     overlay.append(form);
  //     return {
  //       overlay,
  //       form,
  //     };
  //   };


  const renederTodoApp = (app, title) => {
    app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
        'justify-content-center', 'flex-column');
    app.style.backgroundColor = '#adb5bd ';
    const h1 = document.createElement('h1');
    h1.classList.add('mb-3');
    h1.textContent = ` Todo App  `;
    h1.style.color = 'green';
    h1.style.fontSize = '70px';
    const h3 = document.createElement('h3');
    h3.classList.add('mb-5');
    h3.textContent = `${title}`;
    h3.style.color = 'green';
    h3.style.fontSize = '50px';

    const div = document.createElement('div');
    div.classList.add('table-wrapper');
    const table = createTable();
    div.append(table);
    const form = createForm();

    // const {form, overlay} = createForm();


    // header.headerContainer.append(logo);
    // const main = document.createElement('main');
    // main.append(
    //     // h1,
    //     // buttonGroup.btnWrapper,
    //     form,
    //      table,

    //     //   overlay
    //       );
    app.append(h1, h3, form, div);

    return {
      list: table.tbody,
      //   logo,
      //   btnAdd: buttonGroup.btns[0],
      //   btnDel: buttonGroup.btns[1],
      //   formOverlay: overlay,
      form,
    };
  };
  const createRow = ({id, task}) => {
    const tr = document.createElement('tr');
    tr.dataset.id = id;
    tr.classList.add('table-rows', 'table-light');

    const tdId = document.createElement('td');
    tdId.textContent = 'id';

    const tdTask = document.createElement('td');
    tdTask.classList.add('task');
    tdTask.textContent = task;


    const tdStatus = document.createElement('td');
    tdStatus.textContent = 'В процессе';

    const tdEdit = document.createElement('td');

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn', 'btn-danger');
    buttonDelete.textContent = 'Удалить';

    const buttonEnd = document.createElement('button');
    buttonEnd.classList.add('btn', 'btn-success');
    buttonEnd.textContent = 'Завершить';

    tdEdit.append(buttonDelete, buttonEnd);

    tr.append(tdId, tdTask, tdStatus, tdEdit);
    console.log('tr', tr);
    return tr;
  };


  const renderTasks = (elem, data) => {
    const allRow = data.map(createRow);
    console.log('allRow: ', allRow);
    elem.append(...allRow);
    return allRow;
  };


  const addTaskPage = (newTask, list) => {
    const {id, task} = newTask;
    list.append(createRow({id, task}));
  };

  const formControl = (form, list, title) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const inputName = document.querySelector('.form-control');

      const id = Math.random().toString().substring(2, 10);
      const newTask = {
        id,
        task: inputName.value,
      };
      setStorage(title, newTask);
      addTaskPage(newTask, list);
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

  const tableControl = (list, title) => {
    list.addEventListener('click', e => {
      const target = e.target;
      const btnDelItem = document.querySelector('.btn-danger');
      const btnDone = document.querySelector('.btn-success');
      if (btnDelItem === target) {
        console.log('yes', document.querySelector('.btn-danger'));
        const rowDelete = target.closest('.table-rows').dataset.id;
        console.log('rowDelete: ', rowDelete);
        target.closest('.table-rows').remove();
        removeRow(rowDelete, title);
      }

      if (target === btnDone) {
        console.log('done');
        console.log(document.querySelector('.btn-success'));
        const row = target.closest('.table-rows');
        row.classList.remove('table-light');
        row.classList.add('table-success');
        row.children[1].classList.add('text-decoration-line-through');
        row.children[2].textContent = 'Выполнена';
      }
    });
  };


  const getStorage = (key) => {
    let data = [];
    if (JSON.parse(localStorage.getItem(key)) != null) {
      data = JSON.parse(localStorage.getItem(key));
    }
    return data;
  };


  const setStorage = (key, task) => {
    const data = getStorage(key);
    console.log('data: set ', data);
    data.push(task);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const removeRow = (key, title) => {
    const tasks = getStorage(title);
    console.log('tasks: ', tasks);
    for (let i = 0; i < tasks.length; i++) {
      const {id, task} = tasks[i];
      if (id === key) {
        tasks.splice(i, 1);
      }
    }
    console.log(tasks);

    localStorage.setItem(title, JSON.stringify(tasks));
  };

  const init = (selectorApp) => {
    const div = document.querySelector('.app-container');
    div.id = 'app';
    const app = document.querySelector(selectorApp);
    const title = auth();
    const {
      list,

      //   logo,
      //   btnAdd,
      //   formOverlay,
      form,
    //   btnDel,
    } = renederTodoApp(app, title);
    // функционал
    // setOldData();

    const allRow = renderTasks(list, getStorage(title));
    tableControl(list, title);
    formControl(form, list, title);


    // const {closeModal} = modalControl(btnAdd, formOverlay);

    // deleteControl(btnDel, list);
    // formControl(form, list, closeModal);
  };

  window.todoAppInit = init;
}
