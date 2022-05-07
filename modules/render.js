import {createTable, createForm, createRow} from './createElements.js';


export const renederTodoApp = (app, title) => {
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
      'justify-content-center', 'flex-column');
  app.style.backgroundColor = '#adb5bd ';
  const h1 = document.createElement('h1');
  h1.classList.add('mb-3');
  h1.textContent = ` ToDo App  `;
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

  app.append(h1, h3, form, div);

  return {
    list: table.tbody,
    form,
  };
};
export const renderTasks = (elem, data) => {
  const rows = [];
  data.forEach(element => {
    const row = createRow(element);
    elem.append(row);
    rows.push(row);
  });

  return rows;
};
