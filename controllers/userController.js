const Users = require('../userSchema')

const getUsers = async (req,res) =>{
     try{
         const showUsers = await Users.find().toArray()
         .then(results =>{
             res.render('../views/index.ejs', showUsers)
             console.log(showUsers)
         })
     }catch(err){
         res.json({message:err})
     }
    }

    const getUser = (req,res) =>{
        res.json({message:`show me info about the user ${req.params.student_id}`})
       }
    
       const createUser = (req,res) =>{
        res.json({message:`add a new user`})
       }

       const updateUser = (req,res) =>{
        res.json({message:`updated the user ${req.params.student_id}`})
       }

       const deleteUser = (req,res) =>{
        res.json({message:`deleted the user ${req.params.student_id}`})
       }

module.exports = {getUsers, getUser, updateUser, createUser, deleteUser}