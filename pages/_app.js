import '/styles/globals.scss'
import Store from '/store/Store'

function MyApp({Component, pageProps}) {
    return <SafeHydrate><Store><Component {...pageProps} /></Store></SafeHydrate>
}

function SafeHydrate({children}) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

export default MyApp