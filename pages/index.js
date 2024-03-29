import React, {useContext, useEffect} from "react";
import Head from 'next/head'
import useWindowDimensions from "/hooks/WindowDimensions";
import MobileLayout from "/components/mobileLayout";
import DesktopLayout from "/components/desktopLayout";
import style from '/styles/Home.module.scss'
import axios from 'axios'
import {Context} from "/store/Store";
import absoluteUrl from 'next-absolute-url'

const breakPointMobile = parseInt(style.breakPointMobile)

export default function Home({user}) {
    const {width} = useWindowDimensions();
    const [state, dispatch] = useContext(Context);

    const renderLayout = (width) => {

        if (width <= breakPointMobile) {
            window.isMobile = true;
            return <MobileLayout user={user}/>
        } else if (width > breakPointMobile) {
            window.isMobile = false;
            return <DesktopLayout user={user}/>
        }
    }

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            dispatch({type: 'SET_CURRENT_USER', payload: user})
        }
    }, [])
    return (
        <>
            <Head>
                <title>I DO</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
                <link rel="icon" href="/favicon.ico"/>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=G-09CC4JG1WN`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-09CC4JG1WN');
          `,
                    }}
                />
            </Head>
            {renderLayout(width)}
        </>
    )
}

export async function getServerSideProps(context) {
    let user = {}
    let {query, req} = context
    const {origin} = absoluteUrl(req)

    if (query?.userCode) {

        try {
            const {data} = await axios.post(
                `${origin}/api/getUserByCode`,
                {userCode: query.userCode})
            if (user) {
                user = data
            }
        } catch (err) {
            console.log(err.message)
        }

    }
    return {
        props: {user: user},
    }
}