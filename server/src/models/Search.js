const mongoose = require('mongoose')

const searchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    temperature: {
        type: Number
    },
    condition: {
        type: String
    },
    humidity: {
        type: Number
    },
    icon: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Search', searchSchema)