import React, {useEffect, useState} from 'react';
import style from '/styles/Home.module.scss'
import {Animated} from "react-animated-css";
import useTranslation from "next-translate/useTranslation";
import useVisibility from "/hooks/isVisible";

const mapUrl = 'https://www.google.com/maps/place/Ypanema/@38.0273584,22.8717234,18z/data=!4m5!3m4!1s0x0:0xa3665ba575930a00!8m2!3d38.02683!4d22.872204'

export default function section3() {
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
        <div className={`${style.section} ${style.state3}`} ref={currentElement}>
            <div>
                <Animated isVisible={show} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000}
                          animationInDelay={0}
                          className={style.text1}>{t`settings3text1`}</Animated>
                <Animated isVisible={show} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000}
                          animationInDelay={200}
                          className={style.text2}>Ypanema</Animated>
                <Animated isVisible={show} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000}
                          animationInDelay={400}
                          className={style.text3}>{t`settings3text2`}</Animated>
            </div>
            <div className={style.mapWrapper}>
                <a href={mapUrl} target="_blank">
                    <Animated isVisible={show} animationIn="fadeIn"
                              animationOut="fadeOut"
                              animationInDuration={3000}
                              animationInDelay={600}
                              className={style.map}
                    >
                        <span>Map</span>
                    </Animated>
                </a>
            </div>
        </div>
    )
}
