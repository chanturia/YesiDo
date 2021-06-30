const nextTranslate = require('next-translate')
const {wakeDyno} = require('heroku-keep-awake');
const DYNO_URL = 'http://idoyes.herokuapp.com';
const dyno_options = {
    interval: 29,
    logging: true,
    stopTimes: {start: '00:00', end: '06:00'}
}
module.exports = nextTranslate({
    env: {
        mongodburl: "mongodb+srv://chanturia:aRmI11agOPJusptZ@cluster0.snicj.mongodb.net/yesido?retryWrites=true&w=majority",
    },
    future: {
        webpack5: true,
    },
    webpack: (config, {isServer}) => {
        if (isServer) {
            wakeDyno(DYNO_URL, dyno_options)
        }

        return config
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