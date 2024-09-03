
const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title : { type: String, required: true },
    date : { type: String, required: false },
    time : { type: String, required: false },
    content : { type: String, required: false },
    },{
        timestamps: true
})

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    entry : [listSchema]
})

module.exports = mongoose.model('User', userSchema);