import connectDB from '/middleware/mongodb';
import User from '/models/user';

const handler = async (req, res) => {
    var user = new User({
        name: 'test test test',
        amount: 2,
        needHelp: true,
        extraInfo: 'sadfsdfsdf',
        amComing: 'yes',
    });
    // Create new user
    const usercreated = await user.save();
    return res.status(200).send(usercreated);

};

export default connectDB(handler);