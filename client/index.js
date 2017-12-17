import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import './stylesheets/style.scss';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer>
          <Component />
        </AppContainer>
      </BrowserRouter>
    </Provider>,
    document.getElementById('contents')
  );
};

render(App);

if (module.hot) {
  console.log('module is hot!')
  module.hot.accept('./App.jsx', () => {
    render(App);
  });
}