import Express, { urlencoded } from "express";

import Products from "./products.js";
/*const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/books', (req, res) => {
    res.send('Hello books!')
  });
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});*/

const app = Express();
const port = process.env.port || 3000;
//to show the body of url 
//long tıme ago they used to use parsers but now ıt ıs buılt ın 
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
//GET ,PUT ,POST,DELETE
//main path
//the second param ın get ıs always the callback 
//req= all informations commıng in ıt has params and ıt can request query result ....
//custom middleware
function mid (req,res,next){
console.log(req.query);
console.log(req.params);
next();
}

app.get("/",(req,res)=>{
    //req.query /req.params
  // res.send("hello world !!!!!!!!")
res.json(Products)
 
});
//app.get("/product/:id",(req,res)=>{
    app.get("/product/:id",mid,(req,res)=>{
    res.json(Products.find((product)=>{
return +req.params.id==product.id
    }))
//res.send(req.params.id)
 //res.json(Products)
});
//post doesnt return any thimg no return but we can make it returns the status
app.post("/add",(req,res)=>{
    //body is what comes ın post request 
    //dısplays ın the console the ıd of the new added body
    console.log(req.body.id)
    //ıf ıt ıs ok then ıt sends ok 
    res.sendStatus(200);
    //thıs lıne returns the new added json body this is wrong it does not use .send
    //res.send(req.body);

})
app.listen(port, err => {
    if(err){
        return console.log("ERROR",err);
    }
    console.log("Example app listening on port "+port)
  });