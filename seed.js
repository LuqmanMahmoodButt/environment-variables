const mongoose = require('mongoose')
require('dotenv').config();

const Fries = require('./models/fries.js')

async function seed() {
    console.log('seed has begun')

    mongoose.connect(process.env.MONGODB_URI)
    console.log('connection successful')

    const fry = await Fries.create({
        name: 'mcoys',
        type: 'curly',
        rating: 4,
    })
    
    console.log(fry);

    mongoose.disconnect()

}

seed()


