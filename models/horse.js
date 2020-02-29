const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    inprocessed_date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Horse = mongoose.model('Horse', horseSchema);

module.exports = Horse;