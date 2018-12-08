import React, { Component } from 'react';
import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';

import './App.css';
import ProjectList from './ProjectList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount = () => {
    axios.get('https://sprintnodeexpress.herokuapp.com/projects')
      .then( response => {
        if(typeof response.data.message === 'string'){
          Promise.reject("Error: the projects can't be retrieved.")
        }
        this.setState({ projects: response.data })
      })
      .catch(err => console.log(err))
  }

  deleteProject = (id) => {
    return() => {
      axios.delete(`https://sprintnodeexpress.herokuapp.com/projects/${id}`)
        .then(response => {
          axios.get(`https://sprintnodeexpress.herokuapp.com/projects`)
            .then(response => {
              if(typeof response.data.message === 'string'){
                Promise.reject("Error: the projects can't be retrieved")
              }
              this.setState({ projects: response.data })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }



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

        <Route exact path='/' render={(props)=> <ProjectList {...props} projects={this.state.projects} delete={this.deleteProject} /> } />


      </div>
    );
  }
}

export default App;
