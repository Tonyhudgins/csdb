import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';
import store from './store';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>
    </BrowserRouter>,
    document.getElementById('contents')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    render(App);
  });
}