import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import store from './store/index';
import auth from './store/auth';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store} auth={auth} >
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
