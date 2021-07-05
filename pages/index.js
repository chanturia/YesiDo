import React from "react";
import Head from 'next/head'
import useWindowDimensions from "/hooks/WindowDimensions";
import MobileLayout from "/components/mobileLayout";
import DesktopLayout from "/components/desktopLayout";

export default function Home() {
    const {width} = useWindowDimensions();

    const renderLayout = (width) => {

        if (width <= 900) {
            return <MobileLayout/>
        } else if (width > 900) {
            return <DesktopLayout/>
        }
    }

    return (
        <>
            <Head>
                <title>I DO</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {renderLayout(width)}
        </>
    )
}