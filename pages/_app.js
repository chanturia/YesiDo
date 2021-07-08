import {useEffect} from "react";
import '/styles/globals.scss'
import Store from '/store/Store'
import { useRouter } from 'next/router'
import * as gtag from '/extra/gtag'

function MyApp({Component, pageProps}) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

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