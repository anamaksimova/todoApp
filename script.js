import {
  createAuthForm,
} from './modules/createElements.js';

import {
  authModalControl,
  authFormControl,
} from './modules/control.js';

{
  const init = (selectorApp) => {
    const {authOverlay} = createAuthForm();
    const body = document.querySelector('body');
    body.prepend(authOverlay);
    const {openModal} = authModalControl(authOverlay);
    openModal();
    const div = document.querySelector('.app-container');
    div.id = 'app';
    const app = document.querySelector(selectorApp);
    const authForm = document.querySelector('.authForm');
    authFormControl(app, authForm, authOverlay);
  };

  window.todoAppInit = init;
}
