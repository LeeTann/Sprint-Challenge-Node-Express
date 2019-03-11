import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: []
    }
  }

  getProjects = () => {
    axios.get('http://localhost:9000/api/projects')
    .then(res => {
      console.log(res)
      this.setState(() => ({ projects: res.data }))
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getProjects()
  }
 
  render() {
    console.log(this.state)
    return (
      <div className="App">
       <h1>Lee's Sprint Challenge </h1>
       <div>Projects: 
         {this.state.projects.map(project => {
           return(
             <p key={project.id}>{project.name}</p>
           )
         })}
       </div>
      </div>
    );
  }
}

export default App;
