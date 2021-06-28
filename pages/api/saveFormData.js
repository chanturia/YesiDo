export default function saveFormData(req, res) {
    const {method} = req

    console.log(req);
    switch (method) {
        case 'GET':
            // Get data from your database
            res.status(200).json("test")
            break
        case 'POST':
            // Update or create data in your database
            res.status(200).json(req)
            break
        default:
            res.setHeader('Allow', ['POST', 'GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}