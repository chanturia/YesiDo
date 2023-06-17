require('dotenv').config();
const nextTranslate = require('next-translate')
const MONGO_DB_URL = process.env.MONGO_DB_URL;
module.exports = nextTranslate({
    env: {
        mongodburl: MONGO_DB_URL,
    },
    future: {
        webpack5: true,
    }
})

// module.exports = {
//     // poweredByHeader: false,
//     // images: {
//     //     domains: ['localhost'],
//     // },
//     future: {
//         webpack5: true,
//     },
//     // async redirects() {
//     //     return [
//     //         {
//     //             source: '/',
//     //             destination: '/home',
//     //             permanent: true,
//     //         },
//     //     ]
//     // },
// };
