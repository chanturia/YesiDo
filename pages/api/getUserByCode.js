import connectDB from '/middleware/mongodb';
import UserSettings from '/models/usersetting';

const getUserByCode = async (req, res) => {
    const {method, body} = req

    if (method !== "POST") {
        return res.status(405).end(`Method ${method} Not Allowed`)
    }

    if (body) {
        const {userCode} = body
        let user = await UserSettings.find({"userCode": userCode})
        if (user.length > 0) {
            return res.status(200).send(user[0]);
        } else {
            return res.status(404).send("User was not found");
        }
    }

    return res.status(400).end(`No data provided`)
};

export default connectDB(getUserByCode);