import connectDB from '/middleware/mongodb';
import UserSetting from '/models/usersetting';

const getUsersSetting = async (req, res) => {
    const {method} = req

    if (method !== "GET") {
        return res.status(405).end(`Method ${method} Not Allowed`)
    }

    let UsersSetting = await UserSetting.find()
    if (UsersSetting.length > 0) {
        return res.status(200).send(UsersSetting);
    } else {
        return res.status(404).send("Users was not found");
    }
};

export default connectDB(getUsersSetting);