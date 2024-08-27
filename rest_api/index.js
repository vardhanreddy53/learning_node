const express =require('express')
const app=express()
const port=3000

//parse json
app.use(express.json());
app.use(express.urlencoded({extended:false}));
let movies=[{
    id:'1',
    title:'Kalki2898Ad',
    director:'Nag Ashwin',
    release_date:'2024-06-27'
},
{
    id:'2',
    title:'Salaar',
    director:'Prashanth Neel',
    release_date:'2023-12-22'
},
{
    id:'3',
    title:'sahoo',
    director:'sujeeth',
    release_date:'2019-08-30'
},
];

//get the movie list in the form of json
app.get('/movie',(req,res)=>{
    res.json(movies);
});
//add movie to list
app.post('/movie',(req,res)=>{
    const movie=req.body
    console.log(movie);
    movies.push(movie);
    res.send("Movie is added to the list");
});
//search for a movie
app.get("/movie/:id",(req,res)=>{
    const id=req.params.id
    for(let movie of movies){
        if(movie.id===id){
            res.json(movie)
            return
        }
    }
    res.status(404).send("Movie Not Found")
});
//delete a movie
app.delete('/movie/:id',(req,res)=>{
    const id=req.params.id
    movies=movies.filter(movie=>{
        if(movie.id!=id){
            return true
        }
        return false
    })
    res.send('Movie is deleted')
})
//set server to listen
app.listen(port,()=>console.log('Server is listening at %d' ,port));