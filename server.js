const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const Users = require('./userSchema')


    MongoClient.connect('mongodb+srv://admin:adminpassword@cluster0.qmp2g.mongodb.net/user_data?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('user_data')
    const dataCollection = db.collection('user_data')

    app.set('view engine', 'ejs')
    
    app.use(express.static('public'))

    app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
  })

  app.get('/', (req, res) => {
        res.render('index.ejs')
      })

  app.get('/data', (req, res) => {
    db.collection ('user_data').find().toArray()
    .then(results => {
      res.render('data', {user_data: results})
    })
    .catch(error => console.error(error))
  })

  app.post('/', async (req, res) => {
    let newUser = new Users({
      name: req.body.name,
      surname: req.body.surname,
      student_id: req.body.student_id,
      age: req.body.age,
      nationality: req.body.nationality,
      degree: req.body.degree,
      dateAdded: req.body.dateAdded
    })
    try{
      await mongoose.connect('mongodb+srv://admin:adminpassword@cluster0.qmp2g.mongodb.net/user_data?retryWrites=true&w=majority', { useUnifiedTopology: true })
      newUser.save()
      res.redirect('/')
      console.log(newUser)
    }catch (err){
    console.log(err)
  } 
  })

  app.get('/data', (req, res) => {
    res.render('index.ejs')
  })
  
  })  


