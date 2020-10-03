const mongoose = require('mongoose')
const { randomBytes } = require('crypto') // used to generate unique order id -> it's an example

const Fee = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
        min: 2
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    totalIngress: {
        type: Number,
        required: true
    },
    sector: {
        // why number? This decisions is thinking with the language api change
        type: Number,
        enum: [
            1, 2
        ],
        required: true
    },
    workYears: {
        type: Number,
        required: true,
        max: 100,
        min: 0
    },
    amount: {
        type: Number,
        required: true,
        min: 100,
        max: 2000
    },
    frecuency: {
        // In the Future could change and add weekly frequency for example
        // 1 monthly
        // 2 biweekly
        type: Number,
        required: false,
        enum: [
            1, 2
        ],
        default: 1
    },
    payTime: {
        type: Number,
        required: false,
        enum: [
            3,
            6,
            12,
            18,
            24,
            36
        ],
        default: 12
    },
    planId: {
        type: String,
        required: false,
        default: `${randomBytes(4).toString('hex')}-${Math.floor(Math.random() * 100)}`
    },
    fee: {
        type: Number,
        default: 0.0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }, 
    lastFeeAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Fee', Fee)
