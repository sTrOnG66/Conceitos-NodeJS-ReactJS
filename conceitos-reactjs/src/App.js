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

  const handleAddProject = () => {
    setProjects([...projects, `new projeto: ${Date.now()}`]);
  }
  
  return (
    <>
      <Header title="Homepage"/>
      <ul>
        {projects.map(projects => <li key={projects.id}> {projects.title} </li>)}
      </ul>

      <button type='button' onClick={handleAddProject}>adicionar projeto</button>
     </>
  );
}

export default App;
