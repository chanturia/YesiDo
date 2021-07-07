import React, {useEffect, useState} from 'react';
import style from '/styles/Home.module.scss'
import {Animated} from "react-animated-css";
import useTranslation from "next-translate/useTranslation";
import useVisibility from "/hooks/isVisible";

export default function section1() {
    const {t} = useTranslation('common')
    let [isVisible, currentElement] = useVisibility(-20);
    const [visible, setVisible] = useState(false)
    const [show, setShow] = useState(!window.isMobile)

    useEffect(() => {
        if (!visible) {
            setVisible(isVisible)
        }
    }, [isVisible])
    useEffect(() => {
        if (visible) {
            setShow(true)
        }
    }, [visible])


    return (
        <div className={`${style.section} ${style.state1}`} ref={currentElement}>
            <Animated animationIn="fadeIn"
                      animationInDuration={3000}
                      animationOut="fadeOut"
                      animationInDelay={0}
                      isVisible={show}
            >
                <h2>{t`settings1text1`}</h2>
            </Animated>
            <Animated animationIn="fadeIn"
                      animationInDuration={3000}
                      animationOut="fadeOut"
                      animationInDelay={200}
                      isVisible={show}>
                <p>{t`settings1text2`}</p>
            </Animated>
        </div>
    )
}
