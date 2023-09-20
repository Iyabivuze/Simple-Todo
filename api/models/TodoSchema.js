const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type:String,
        default: Date.now(),
    },
})

module.exports = mongoose.model("Todo", todoSchema)