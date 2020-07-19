import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import api from './services/api'

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject() {

    const response = await api.post('projects', {
      title: `new projeto: ${Date.now()}`,
      owner: "Leonardo Brasil"
    });
  
    const project = response.data;
    console.log(project);
    setProjects([...projects, project])
  }
  
  return (
    <>
      <Header title="Homepage"/>
      <ul>
        {projects.map(project => <li key={project.id}> {project.title} </li>)}
      </ul>

      <button type='button' onClick={handleAddProject}>adicionar projeto</button>
     </>
  );
}

export default App;
