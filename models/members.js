const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembersSchema = new Schema({
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
},{
    timestamps: true,
});

module.exports = mongoose.model('Members', MembersSchema);