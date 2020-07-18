const express = require('express');
const { uuid, isUuid } = require('uuidv4')

const app = express();
app.use(express.json());

const projects = [];

//Middleware
function validateProjectId(req, res, next){
  const { id } = req.params;

  if(!isUuid(id)) return res.status(400).json({error: 'Invalid project ID'});

  return next();

}

app.use('/project/:id', validateProjectId)

//listing  all projects
app.get('/', (req, res) => {

  const { title } = req.query;
  const resultFilter =  title 
  ? projects.filter(project => project.title.includes(title)) : projects;

  const allProjects = projects[0];

  if(allProjects === undefined) return res.json({message: 'no projects'})

  return res.json(resultFilter);
});


//create projects
app.post('/project', (req, res) => {
  const { title, owner} = req.body;

  const newProject = {
    id: uuid(),
    title,
    owner
  }

  const verifyBody = newProject.title && newProject.owner ? true : false
  if(verifyBody === false) return res.status(400).json({message: 'fill in title and owner'})

  const verifyProjectExists = projects.findIndex(project => newProject.title === project.title);
  if(verifyProjectExists > -1) return res.status(400).json({error: 'project already exists'})

  projects.push(newProject);

   return res.status(200).json(newProject);
});


//update projects
app.put('/project/:id', (req, res) => {
  const { id } = req.params;
  
  const verifyProjectExists = projects.findIndex(projet => projet.id === id);
  if(verifyProjectExists < 0) return res.status(400).json({error: 'project is not exists'});

  const { title, owner } = req.body;

  const updateProject = { id, title, owner}
  projects[verifyProjectExists] = updateProject;


  return res.status(200).json([{
    message: 'success in updating the project',
    project: updateProject
  }]);

});

//delete projects
app.delete('/project/:id', (req, res) => {
  const { id } = req.params;
  
  const verifyProjectExists = projects.findIndex(projet => projet.id === id);
  if(verifyProjectExists < 0) return res.status(400).json({error: 'project is not exists'});

  projects.splice(verifyProjectExists, 1);
  return res.status(204).send();
});

app.listen( 3333, () => {
  console.log('🚀🚀 servidor iniciado 🚀🚀');
});