export const createTable = () => {
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

export const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
        <input type="text" class="form-control input-form"
         placeholder="ввести задачу" required>
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
export const createAuthForm = () => {
  const authOverlay = document.createElement('div');
  authOverlay.classList.add('modal', 'fade');
  authOverlay.setAttribute('tabindex', '-1');
  authOverlay.setAttribute('aria-labelledby', 'myModalLabel');
  authOverlay.setAttribute('aria-hidden', 'true');

  authOverlay.insertAdjacentHTML('beforeend', `
    <div class="modal-dialog modal-dialog-centered ">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" style = "text-align: center;"> 
          Добро пожаловать в ToDoApp! Ваше имя?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" 
        aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
      <form class="authForm d-flex align-items-center mb-3">
      <label class=form-group me-3 mb-0 ">

         <input class="form-control auth-control" type="text"
          placeholder="имя..." required>
      </label>
         
        <button type="submit" class="btn btn-primary mx-5 me-3 
        auth-btn">Войти в ToDoApp</button>
      </form>
      </div>
    </div>
  </div>
 `);

  return {
    authOverlay,
  };
};
export const createRow = ({id, task}) => {
  const tr = document.createElement('tr');
  tr.dataset.id = id;
  tr.classList.add('table-rows', 'table-light');

  const tdId = document.createElement('td');
  tdId.textContent = document.querySelectorAll('tr').length;

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

  return tr;
};
