import React, { Component } from 'react';
import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/projects'>Projects</NavLink>
          <NavLink to='/actions'>Actions</NavLink>
          <NavLink to='/add-project'>Add New Project</NavLink>
          <NavLink to='/add-action'>Add New Action</NavLink>
        </nav>

      
      </div>
    );
  }
}

export default App;
