import React from 'react';
import {ToastContainer, Slide} from 'react-toastify';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import {store} from './store';
import Routes from './routes';
import history from './services/history'

import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';;

function App() {
  return (
    <Provider store={store}>
        <Router history={history}>
          <Routes />
          <ToastContainer autoClose={3000} draggable transition={Slide} />
        </Router>
    </Provider>
  );
}

export default App;
