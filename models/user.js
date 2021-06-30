import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    // userRefId: {
    //     type: String,
    //     required: true
    // },
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
    }
});

mongoose.models = {};
const User = mongoose.model('users', user);

export default User;