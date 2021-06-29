import connectDB from '/middleware/mongodb';
import User from '/models/user';
import faker from 'faker';

const handler = async (req, res) => {
    var user = new User({
        name: faker.name.findName(),
        amount: faker.datatype.number({min: 1, max: 4}),
        needHelp: faker.datatype.boolean(),
        extraInfo: faker.lorem.sentences(),
        amComing: 'yes',
    });
    // Create new user
    const usercreated = await user.save();
    return res.status(200).send(usercreated);

};

export default connectDB(handler);