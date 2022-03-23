const express = require('express')
const router = express.Router()
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/userController')

//GET all users
router.get('/', getUsers)

//GET one user
router.get('/:student_id', getUser)

//POST add a new user
router.post('/', createUser)

//PUT update a user
router.post('/:student_id', updateUser)

//DELETE a user
router.delete('/:student_id', deleteUser)




module.exports = router