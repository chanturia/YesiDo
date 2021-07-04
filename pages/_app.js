import '/styles/globals.scss'

function MyApp({Component, pageProps}) {
    return <SafeHydrate><Component {...pageProps} /></SafeHydrate>
}

function SafeHydrate({children}) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

export default MyApp