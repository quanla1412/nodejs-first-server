const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    mssv: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
    male: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Member', MemberSchema);