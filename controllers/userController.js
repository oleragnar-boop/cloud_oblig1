const getUsers = (req,res) =>{
     res.send('<h1>Users will show up here</h1>') 
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