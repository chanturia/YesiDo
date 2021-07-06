import connectDB from '/middleware/mongodb';
import User from '/models/user';

const saveFormData = async (req, res) => {
    const {method, body} = req

    if (method !== "POST") {
        return res.status(405).end(`Method ${method} Not Allowed`)
    }

    if (body) {
        const {firstAndLastName, userCode, amount, amComing, needHelpWithTransfer, extraInfo} = body
        const data = {
            firstAndLastName: firstAndLastName,
            amount: amount,
            userCode: userCode,
            needHelpWithTransfer: needHelpWithTransfer,
            extraInfo: extraInfo,
            amComing: amComing,
            lastUpdated: new Date()
        }
        const query = {"userCode": userCode}
        const user = await User.findOneAndUpdate(query, data, {upsert: true, new: true});
        return res.status(200).send(user);
    }

    return res.status(400).end(`No data provided`)
};

export default connectDB(saveFormData);