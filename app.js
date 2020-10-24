const express = require('express')
const app = express()
const port = 3000
const {projects} = require('./data.json');

app.set('view engine','pug');
app.use(express.static('public'));


//ROUTES

app.get('/', (req, res) => {
    res.render('index', {projects})
})
app.get('/about', (req,res)=>{
    res.render('about');
})
app.get('/projects', (req,res)=>{
    res.render('index', {projects});
})
app.get('/projects/:id', (req,res)=>{
    let projectID = req.params.id;
    res.render('project', {project: projects[projectID]});
})

//catch all requests that make it past all the routes
app.use((req, res, next)=>{
    const err = new Error("This page does not exist on the server.");
    err.status = 404;
    next(err);
})

//custom error function
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    if (err.status === 404){
        res.render('page-not-found',{
            error: {
                status : err.status,
                message: err.message
            }})
    } else {
        res.render('error',{
            error: {
                status : err.status,
                message: err.message
            }
        })
    }
})


//LISTENER

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}! Check it out!`)
})
