

const mongoose = require('mongoose')

const frySchema = new mongoose.Schema({
    name: { type: String, require: true},
    type: { type: String, require: true},
    rating: { type: Number, require: true},
})


module.exports = mongoose.model('Fry', frySchema)