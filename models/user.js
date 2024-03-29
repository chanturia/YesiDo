import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const user = new Schema({
    firstAndLastName: {
        type: String,
        required: true
    },
    userCode:{
        type: String,
        required: true
    },
    amComing: {
        type: String,
        required: true
    },
    extraInfo: {
        type: String,
        required: false
    },
    needHelpWithTransfer: {
        type: Boolean,
        required: false
    },
    amount: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        required: false
    }
});

mongoose.models = {};
const User = mongoose.model('users', user, 'users');

export default User;