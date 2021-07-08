import React, {useEffect, useRef, useState} from "react";
import style from '/styles/Home.module.scss'
import Navigation from "/components/navigation";
import RunningText from "/components/runningText";
import FormModal from "/components/formModal/formModal";
import useTranslation from "next-translate/useTranslation";
import Section1 from "/components/section1";
import Section2 from "/components/section2";
import Section3 from "/components/section3";
import ScrollPointer from "/components/scrollPointer";
import logo from "/svg/logo";

export default function DesktopLayout() {
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
        setIsScrolling(true)
        setDeltaY(e.deltaY)
    }


    return (
        <div className={style.container} ref={mainContainerRef} onWheel={wheelScroll}>
            <ScrollPointer/>
            <section className={style.mainSection}>
                <Navigation/>
                <div className={style.centerBG}>
                </div>
                <div className={style.mainLogo}>
                    {logo}
                </div>
                <div className={style.mainPoster}>
                    <RunningText string={t`runningTextMain`}
                                 size={3}
                                 bottom={4}
                                 weight={400}
                    />
                    <RunningText string={t`runningTextSecondary`}
                                 size={1.5}
                                 bottom={1.5}
                                 weight={300}
                    />
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