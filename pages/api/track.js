import connectDB from '/middleware/mongodb';
import User from '/models/user';

const handler = async (req, res) => {
    console.log(new Date().toLocaleString())

    return res.status(200).send('tracked');

};

export default connectDB(handler);