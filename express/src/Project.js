import React from 'react';

const Project = props => {
    return(
        <div>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <button onClick={props.delete(props.id)}>Delete me!</button>
        </div>
    );
};

Project.defaultProps = {
    name: '',
    description: ''
};

export default Project;