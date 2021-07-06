import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSettingsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    allowedAmount: {
        type: Number,
        required: true
    },
    userCode:{
        type: String,
        required: true
    },
});

mongoose.models = {};
const UserSettings = mongoose.model('serSetting', userSettingsSchema,'usersetting');




export default UserSettings;