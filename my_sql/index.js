const express=require('express')
const mysql=require('mysql')
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodemysql',
})
//connecting to database
db.connect(err=>{
    if(err)
        throw(err);
    console.log("connected to database");
})
const app=express()
//creating a database
app.get('/createdb',(req,res)=>{
    let sql='CREATE DATABASE nodemysql'
    db.query(sql,(err,result)=>{
        if(err)
            throw err;
    })
    res.send("database is created");
})
//create tables
app.get('/createemployee',(req,res)=>{
    let sql='CREATE TABLE employee(id int AUTO_INCREMENT,name VARCHAR(255),designation VARCHAR(255),PRIMARY KEY(id))'
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
            
        res.send("table created");
    })
})
//inserting data
app.get('/employee1',(req,res)=>{
    let post={name:'vardhan reddy',designation:'chief executive officer'}
    let sql="INSERT INTO employee SET ?"
    let query=db.query(sql,post,err=>{
        if(err){
             throw err;
        }
        res.send("employee added");
    });
})
//select employee
app.get('/getemployee',(req,res)=>{
    let sql="SELECT * FROM employee";
    let query=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        res.send("employee details fetched");
    });
});
//update 
app.get('/updateemployee/:id', (req, res) => {
    let newName ='Updated name'
    let sql ='UPDATE employee SET name =${newName}WHERE id=',${req.params.id}
    let query =db. query(sql, err =>{
    if(err){
    throw err;
     }
    res.send('Employee updated');
    })
})
  
app.listen('3000',()=>{
    console.log('server started on 3000')
})