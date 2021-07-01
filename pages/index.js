import React, {useEffect, useRef, useState} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import style from '/styles/Home.module.scss'
import Navigation from "/components/navigation";
import RunningText from "/components/runningText";
import FormModal from "/components/formModal";
import useTranslation from "next-translate/useTranslation";

const Section1 = dynamic(() => {
    return import("/components/section1");
}, {ssr: false});

const Section2 = dynamic(() => {
    return import("/components/section2");
}, {ssr: false});

const Section3 = dynamic(() => {
    return import("/components/section3");
}, {ssr: false});

export default function Home() {
    const mainContainerRef = useRef()
    const [deltaY, setDeltaY] = useState(0)
    const sections = [0, 1, 2]
    const [currentSection, setCurrentSection] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const {t} = useTranslation('common')

    const showSections = () => {
        switch (currentSection) {
            case 0:
                return <Section1/>
            case 1:
                return <Section2/>
            case 2:
                return <Section3/>
            default:
                return <Section1/>
        }
    }
    useEffect(() => {
        showSections()
    }, [])

    useEffect(() => {
        showSections()
    }, [currentSection])

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


    return (
        <div className={style.container} ref={mainContainerRef} onWheel={wheelScroll}>
            <Head>
                <title>I DO</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
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
                    <RunningText string={t`runningTextMain`} size={3} bottom={4}
                                 weight={400}/>{/*TODO resolve Problem with classname*/}
                    <RunningText string={t`runningTextSecondary`} size={1.5} bottom={1.5}
                                 weight={300}/>{/*TODO resolve Problem with classname*/}
                </div>
                {showSections()}
                <FormModal/>
                <div className={style.flowersContainer}>
                    <div className={style.flower1}><img src="/images/elia.png" alt="flower1"/></div>
                    <div className={style.flower2}><img src="/images/flower.png" alt="flower1"/></div>
                    <div className={style.flower3}><img src="/images/elia-1.png" alt="flower1"/></div>
                </div>
            </section>
        </div>
    )
}