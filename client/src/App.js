import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';

import Contact from './components/contacts/Contact';


const App = () => {

  return (
    <Provider store={store} >
      <Router>
        <Route exact path='/' component={Contact} />
      </Router>
    </Provider>
  );
}

export default App;
