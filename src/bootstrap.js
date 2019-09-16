import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app";
import reducer from "./store/reducers/auth";
import thunk from 'redux-thunk';


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
//const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStore(reducer, composeEnhances (
	applyMiddleware(thunk)
));

import "./style/main.scss";

function main() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);
