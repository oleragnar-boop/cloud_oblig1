const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://admin:adminpassword@cluster0.qmp2g.mongodb.net/user_data?retryWrites=true&w=majority')
        console.log('Connected to db using env')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;