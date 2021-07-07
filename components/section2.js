import React, {useEffect, useState} from 'react';
import style from '/styles/Home.module.scss'
import {Animated} from "react-animated-css";
import useTranslation from "next-translate/useTranslation";
import useVisibility from "/hooks/isVisible";

export default function section2() {
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
        <div className={`${style.section} ${style.state2}`} ref={currentElement}>
            <Animated isVisible={show} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000}
                      animationInDelay={0} className={style.text1}>{t`settings2text1`}</Animated>
            <Animated isVisible={show} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000}
                      animationInDelay={200} className={style.text2}>{t`settings2text2`}</Animated>
            <Animated isVisible={show} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000}
                      animationInDelay={400} className={style.text3}>{t`settings2text3`}</Animated>
        </div>
    )
}
