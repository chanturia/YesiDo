import React, {useEffect, useRef, useState} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import style from '/styles/Home.module.scss'
import Navigation from "../components/navigation";
import RunningText from "/components/runningText";

const Section1 = dynamic(() => {
    return import("../components/section1");
}, {ssr: false});

const Section2 = dynamic(() => {
    return import("../components/section2");
}, {ssr: false});

const Section3 = dynamic(() => {
    return import("../components/section3");
}, {ssr: false});

export default function Home() {
    const router = useRouter();
    const mainContainerRef = useRef()
    const [deltaY, setDeltaY] = useState(0)
    const sections = ["/#section1", "/#section2", "/#section3"]
    const [currentSection, setCurrentSection] = useState(sections.indexOf(router.asPath))
    const [isScrolling, setIsScrolling] = useState(false)
    const showSections = () => {
        switch (router.asPath) {
            case "/#section1":
                return <Section1/>
            case "/#section2":
                return <Section2/>
            case "/#section3":
                return <Section3/>
            default:
                return <Section1/>
        }
    }
    useEffect(() => {
        showSections()
    }, [])

    useEffect(() => {
        if (isScrolling) {
            setTimeout(() => {
                if (deltaY < 0) {
                    prevSection()
                } else {
                    nextSection()
                }
                setIsScrolling(false)
            }, 400)
        }
    }, [isScrolling])

    useEffect(() => {
        if (sections[currentSection]){
            router.push(sections[currentSection]).then()
        }
        else {
            nextSection()
        }

    }, [currentSection])

    function nextSection() {
        if (currentSection < sections.length - 1) {
            setCurrentSection(currentSection + 1)
        }
    }

    function prevSection() {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1)
        }
    }

    function wheelScroll(e) {
        console.log(e.deltaY)
        setIsScrolling(true)
        setDeltaY(e.deltaY)
    }


    // useEffect(() => {
    //     mainContainerRef.current.addEventListener('wheel', wheelScroll)
    //     // return mainContainerRef.current.removeEventListener('wheel', wheelScroll)
    // }, [])

    return (
        <div className={style.container} ref={mainContainerRef} onWheel={wheelScroll}>
            <Head>
                <title>I DO</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <section className={style.mainSection}>
                <Navigation/>
                <div className={style.centerBG}>
                </div>
                <div className={style.mainLogo}>
                    <img src="/images/Logo.svg" alt="I Do Logo"/>
                </div>
                <div className={style.mainPoster}>
                    <RunningText/>{/*TODO resolve Problem with classname*/}
                </div>
                {showSections()}
                <div className={style.flowersContainer}>
                    <div className={style.flower1}><img src="/images/elia.png" alt="flower1"/></div>
                    <div className={style.flower2}><img src="/images/flower.png" alt="flower1"/></div>
                    <div className={style.flower3}><img src="/images/elia-1.png" alt="flower1"/></div>
                </div>
            </section>
        </div>
    )
}