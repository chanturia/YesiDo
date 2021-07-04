import React, {useRef} from "react";
import style from '/styles/Home.module.scss'
import Navigation from "/components/navigation";
import RunningText from "/components/runningText";
import FormModal from "/components/formModal";
import useTranslation from "next-translate/useTranslation";
import Section1 from "/components/section1";
import Section2 from "/components/section2";
import Section3 from "/components/section3";


export default function MobileLayout() {
    const mainContainerRef = useRef()
    const {t} = useTranslation('common')


    return (
        <div className={style.container} ref={mainContainerRef}>
            <section className={style.mainSection}>
                <Navigation/>
                <div className={style.mainLogo}>
                    <img src="/images/Logo.svg" alt="I Do Logo"/>
                </div>
                <div className={style.mainPoster}>
                </div>
                <div className={style.mobileRunningTextWrapper}>
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
                <div className={style.mobileSectionsWrapper} style={{position: "relative", padding: "2rem 0 3rem 0"}}>
                    <div className={style.centerBG}>
                    </div>
                    <div>
                        <Section1/>
                        <Section2/>
                        <Section3/>
                    </div>
                    <FormModal/>
                    <div className={style.flowersContainer}>
                        <div className={style.flower1}><img src="/images/elia.png" alt="flower1"/></div>
                        <div className={style.flower2}><img src="/images/flower.png" alt="flower1"/></div>
                        <div className={style.flower3}><img src="/images/elia-1.png" alt="flower1"/></div>
                    </div>
                </div>
            </section>
        </div>
    )
}