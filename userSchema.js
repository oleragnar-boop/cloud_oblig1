const mongoose = require('mongoose')
//Schema for making new users
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    student_id: { type: Number, required: true },
    age: { type: Number, required: true },
    nationality: { type: String, required: true },
    degree: { type: String, required: true },
    dateAdded: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model("Users", userSchema, "user_data")