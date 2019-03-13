import React from 'react'
import { Link } from 'react-router-dom'

class ProjectList extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            // projects: ""
        }
    }

    render() {
        return(
            <div>
                {this.props.projects.map(project => {
                    return(
                     <p key={project.id}>{project.name}</p>
                    )
                })}
            </div>          
        )
    }
}

export default ProjectList