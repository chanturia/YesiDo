import mongoose from 'mongoose';

const mongoDbUrl = 'mongodb+srv://chanturia:aRmI11agOPJusptZ@cluster0.snicj.mongodb.net/yesido?retryWrites=true&w=majority';
const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(mongoDbUrl, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
    });
    return handler(req, res);
};

export default connectDB;