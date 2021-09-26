import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import List from './components/List';
import New from './components/New';
import Home from './components/Home';
import Login from './components/Login';
import AppBar from './containers/appbar';
import reportWebVitals from './reportWebVitals';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import store from './reducers/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
            <AppBar />
            <div>
                <Switch>
                    <Route path="/new">
                        <New />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <List />
                    </Route>


                </Switch>
            </div>
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
