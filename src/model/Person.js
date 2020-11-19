const mongoose = require('mongoose')
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  age: Number,
  favoriteFoods: [{type:String}]
})
module.exports = mongoose.model('Persons', personSchema)