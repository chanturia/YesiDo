import connectDB from '/middleware/mongodb';
import User from '/models/user';

const getUsers = async (req, res) => {
    const {method} = req

    if (method !== "GET") {
        return res.status(405).end(`Method ${method} Not Allowed`)
    }

    let users = await User.find()
    if (users.length > 0) {
        return res.status(200).send(users);
    } else {
        return res.status(404).send("Users was not found");
    }
};

export default connectDB(getUsers);