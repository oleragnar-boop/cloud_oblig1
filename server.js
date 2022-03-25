//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const Users = require('./userSchema')


//This project was made by Ole Ragnar Randen and Daniel Peder Björk as a part of the subject IDG2001 Cloud Technologies 

// t0 event som printer timestamp on click
// t1 på server i post
// t2 på sevrver etter 
// t3 hentet fra server

//Connecting to the database via MongoCLient
MongoClient.connect('mongodb+srv://admin:adminpassword@cluster0.qmp2g.mongodb.net/user_data?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('user_data')
    const dataCollection = db.collection('user_data')

    //Making the view of this app ejs
    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(process.env.PORT || 3000, function () {
      console.log('listening on 3000')
    })

    //GET to serve the index.ejs page
    app.get('/', (req, res) => {
      res.render('index.ejs')
    })

    //GET to fetch all the students from the user_data collection in mongodb
    app.get('/data', async (req, res) => {
      db.collection('user_data').find().toArray()
        .then(results => {
          res.render('data', { user_data: results, currentId: req.query.searchid, currentdegree: req.query.degree })
        })
    })

    //GET to fetch one student from the user_data collection in mongodb that matches the currentid
    //uses req.query.searchid to find the id currently being searched
    app.get('/getstudent', async (req, res) => {
      let currentid = parseInt(req.query.searchid);
      let currentdegree = req.query.degree;
      db.collection('user_data').find({ student_id: currentid }).toArray()
        .then(results => {
          res.render('data', { user_data: results, currentId: currentid, currentdegree: currentdegree })
        })
    })

    //GET to fetch all students from the user_data collection in mongodb that matches the degree currently being searched
    //uses req.query.degree to find the degree currently being searched
    app.get('/getdegrees', async (req, res) => {
      let currentid = parseInt(req.query.searchid);
      let currentdegree = req.query.degree;
      db.collection('user_data').find({ degree: currentdegree }).toArray()
        .then(results => {
          res.render('data', { user_data: results, currentdegree: currentdegree, currentId: currentid })
        })
    })

    //GET that functions as a DELETE, uses the current searchid to find and delete a user with a matching id from the database 
    app.get('/delstudent', async (req, res) => {
      let currentid = parseInt(req.query.searchid);
      let currentdegree = req.query.degree;
      db.collection('user_data').findOneAndDelete({ student_id: currentid })
        .then(results => {
          res.render('data', { user_data: results, currentId: currentid, currentdegree: currentdegree })
          console.log("Student", currentid, "Deleted")
        })
    })

    //POST that adds users from the Add user form to the database based on the userSchema
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
      try {
        await mongoose.connect('mongodb+srv://admin:adminpassword@cluster0.qmp2g.mongodb.net/user_data?retryWrites=true&w=majority', { useUnifiedTopology: true })
        newUser.save()
        res.redirect('/')
        console.log(newUser)
      } catch (err) {
        console.log(err)
      }
    })

    //POST that works as a PUT to update users entered in the Update user form. Uses student_id as an identifier
    app.post('/updatestudent', async (req, res) => {
      dataCollection.findOneAndUpdate(
        {
          student_id: parseInt(req.body.student_id)
        },
        {
          $set:
          {
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            nationality: req.body.nationality,
            degree: req.body.degree,
            dateAdded: req.body.dateAdded
          }
        },
      ).then((result) => {
        res.redirect('/time')
      })
        .catch((error) => console.error(error));
    })

//GET method to get timestamps for t1 and t2
    app.get('/time', (req, res) => {
      console.log("t1", Date.now())
      let t1 = Date.now()
      db.collection('user_data').find().toArray()
      .then(results => {
        console.log("t2", Date.now())
        let t2 = Date.now()
        res.send({"results": results, "time":[t1, t2]})
      })
    })
  });
