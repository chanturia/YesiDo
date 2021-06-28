const nextTranslate = require('next-translate')

module.exports = nextTranslate({
    env: {
        mongodburl: "mongodb+srv://chanturia:aRmI11agOPJusptZ@cluster0.snicj.mongodb.net/yesido",
    },
    future: {
        webpack5: true,
    },
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