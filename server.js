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

    app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
  })

  app.get('/', (req, res) => {
        res.render('index.ejs')
      })

  app.get('/data', async (req, res) => {
    db.collection ('user_data').find().toArray()
    .then(results => {
      res.render('data', {user_data: results, currentId: req.query.searchid, currentdegree: req.query.degree})
    })
})

app.get('/getstudent', async (req, res) => {
  let currentid = parseInt(req.query.searchid);
  let currentdegree = req.query.degree;
      db.collection ('user_data').find({student_id: currentid}).toArray()
      .then(results => {
        res.render('data', {user_data: results, currentId: currentid,  currentdegree: currentdegree})
    })
})

app.get('/getdegrees', async (req, res) => {
  let currentid = parseInt(req.query.searchid);
  let currentdegree = req.query.degree;
      db.collection ('user_data').find({degree: currentdegree}).toArray()
      .then(results => {
        res.render('data', {user_data: results, currentdegree: currentdegree, currentId: currentid})
    })
})

app.get('/delstudent', async (req, res) => {
  let currentid = parseInt(req.query.searchid);
  let currentdegree = req.query.degree;
      db.collection ('user_data').findOneAndDelete({student_id: currentid})
      .then(results => {
        res.render('data', {user_data: results, currentId: currentid,  currentdegree: currentdegree})
        console.log("Student", currentid, "Deleted")
    })
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

  app.post('/updatestudent', async (req, res) => {
    await mongoose.connect('mongodb+srv://admin:adminpassword@cluster0.qmp2g.mongodb.net/user_data?retryWrites=true&w=majority', { useUnifiedTopology: true })
    Users.findOneAndUpdate({
      student_id: req.params.student_id},
      {$set:{
      surname: req.body.surname,
      age: req.body.age,
      nationality: req.body.nationality,
      degree: req.body.degree,
      dateAdded: req.body.dateAdded
    }}, function(err) {
      if (err) return res.send(500, {error: err});
      res.redirect('/')
    })
})
})