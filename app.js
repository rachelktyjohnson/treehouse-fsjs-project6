const express = require('express')
const app = express()
const port = 3000
const {projects} = require('./data.json');


app.set('view engine','pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {projects})
})

app.get('/about', (req,res)=>{
    res.render('about');
})

app.get('/projects', (req,res)=>{
    res.render('index');
})

app.get('/projects/:id', (req,res)=>{
    let projectID = req.params.id;
    res.render('project', {project: projects[projectID]});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
