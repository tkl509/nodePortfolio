const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sponsorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    logo_image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Sponsor = mongoose.model('Sponsor', sponsorSchema);

module.exports = Sponsor;