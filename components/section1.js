import React from 'react';
import style from '/styles/Home.module.scss'
import {Animated} from "react-animated-css";
import useTranslation from "next-translate/useTranslation";
import useVisibility from "/hooks/isVisible";

export default function section1() {
    const {t} = useTranslation('common')
    let [isVisible, currentElement] = useVisibility(0, 1000);
    isVisible = window.isMobile ? isVisible : true

    return (
        <div className={`${style.section} ${style.state1}`} ref={currentElement}>
            <Animated animationIn="fadeIn"
                      animationInDuration={3000}
                      animationOut="fadeOut"
                      animationInDelay={0}
                      isVisible={isVisible}
            >
                <h2>{t`settings1text1`}</h2>
            </Animated>
            <Animated animationIn="fadeIn"
                      animationInDuration={3000}
                      animationOut="fadeOut"
                      animationInDelay={200}
                      isVisible={isVisible}>
                <p>{t`settings1text2`}</p>
            </Animated>
        </div>
    )
}
