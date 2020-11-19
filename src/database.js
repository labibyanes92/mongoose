const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const server = 'localhost';
const database='mongoosecp';
const person = require('./model/Person')


        mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true })

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
          urlencoded:true
        }))
        
        
        
        app.get('/',function(req,res){
            res.send('Home')
        })
        
        app.post('/persons',function(req,res){
            let newPerson = new person()
            newPerson.name = req.body.name
            newPerson.age = req.body.age
            newPerson.favoriteFoods = req.body.favoriteFoods
          
            newPerson.save(function(err,person){
              if(err){
                res.send('Error')
              } else {
                res.send(person)
              }
            })
          })
        
        app.get('/persons',function(req,res){
            person.find()
            .exec(function(err,persons){
              if(err){
                res.send('Error')
              } else {
                res.json(persons)
              }
            })
          })


          app.get('/persons/:favoriteFoods',function(req,res){
            person.findOne({
                favoriteFoods: req.params.favoriteFoods
            })
            .exec(function(err, person){
              if(err){
                res.send('Error')
              } else {
                res.json(person)      
              }
            })
          })


        app.get('/personsbyname',function(req,res){
            person.find({
              name: 'marwen'
            })
            .exec(function(err, person){
              if(err){
                res.send('Error')
              } else {
                res.json(person)      
              }
            })
          })
        
        
        
        app.get('/personbyid/:id',function(req,res){
            person.findById({
              _id: req.params.id
            })
            .exec(function(err, person){
              if(err){
                res.send('Error')
              } else {
                res.json(person)      
              }
            })
          })
        
        app.put('/persons/:name',function(req,res){
            person.findOneAndUpdate({
              name:req.params.name
            },
            {$set:{age:req.body.age}},
            {new:true},
            function(err,newPerson){
              if(err){
                console.log('Error')
              } else {
                res.send(newPerson)
              }
            })
          })
        
        app.delete('/persons/:id',function(req,res){
            person.findOneAndRemove({
              _id:req.params.id
            },function(err,person){
              if(err){
                res.send('Error')
              } else {
                res.send(person)
              }
            })
          })
        
        app.get('/personsquery',function(req,res){
            person.find({
                favoriteFoods: 'burrito'
            })
            .sort({firstName: 1})
            .limit(2)
            .select({age:false})
            .exec(function(err,persons){
              if(err){
                res.send('Error')
              } else {
                res.json(persons)
              }
            })
          })


        const port = 8000
        app.listen(port,function(){
            if (err)
            { 
                console.log(err)
            }
            else {
            console.log(`Server is up and running on  port:  ${port}`)
                }
            })
        


