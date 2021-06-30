import connectDB from '/middleware/mongodb';
import User from '/models/user';
import faker from "faker";


// export default function saveFormData(req, res) {
//     const {method} = req
//
//     console.log(req);
//     switch (method) {
//         case 'POST':
//             // Update or create data in your database
//             res.status(200).json(req)
//             break
//         default:
//             res.setHeader('Allow', ['POST', 'GET'])
//             res.status(405).end(`Method ${method} Not Allowed`)
//     }
// }

const saveFormData = async (req, res) => {
    const {method, body} = req

    if (method !== "POST") {
        return res.status(405).end(`Method ${method} Not Allowed`)
    }

    if (body) {
        const {firstAndLastName, amount, amComing, needHelpWithTransfer, extraInfo} = body
        var user = new User({
            name: firstAndLastName,
            amount: amount,
            needHelpWithTransfer: needHelpWithTransfer,
            extraInfo: extraInfo,
            amComing: amComing,
        });
        // Create new user
        const userCreated = await user.save();
        console.log(userCreated)
        return res.status(200).send(userCreated);
    }

    return res.status(400).end(`No data provided`)

    // const user = new User({
    //     name: faker.name.findName(),
    //     amount: faker.datatype.number({min: 1, max: 4}),
    //     needHelp: faker.datatype.boolean(),
    //     extraInfo: faker.lorem.sentences(),
    //     amComing: 'yes',
    // });
    // // Create new user
    // const newUser = await user.save();
    // return res.status(200).send(newUser);

};

export default connectDB(saveFormData);