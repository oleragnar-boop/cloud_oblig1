//Loading dependencies
const express = require('express');
const bodyParser= require('body-parser');
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3000
const connectDB = require('./dbconnect')

const app = express();
connectDB()

app.set('view engine', 'ejs')

app.use('/user_data', require('./routes/userRoutes'))

app.listen(3000, function() {
    console.log(`listening on ${PORT}`)
  })

app.get ('/', (req, res) => {
  res.render('index.ejs')
})


/*
//Connecting to the database, displaying the data stored in user_data and serving the index.ejs file
    MongoClient.connect('mongodb+srv://admin:adminpassword@cluster0.qmp2g.mongodb.net/user_data?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('user_data')
    const dataCollection = db.collection('user_data')

    
    app.set('view engine', 'ejs')
    
    app.use('/user_data', require('./routes/userRoutes'))

    app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log(`listening on ${PORT}`)
  })
// Getting data from the database and displaying it in the index.ejs file
  app.get('/', (req, res) => {
      db.collection ('user_data').find().toArray()
      .then(results => {
        res.render('index.ejs', {user_data: results})
      })
.catch(error => console.error(error))
  })

  app.post('/user_data', (req, res) => {
    dataCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  })

})
*/