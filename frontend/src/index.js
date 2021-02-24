import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import history from './services/history';
import { Router } from 'react-router-dom';

import Reset from './styles/generic';
import Base from './styles/base';
import Global from './styles/settings';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Reset />
      <Base />
      <Global.Colors />
      <Global.Sizes />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
