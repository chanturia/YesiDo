import React from 'react';
import style from '/styles/Home.module.scss'
import {Animated} from "react-animated-css";
import useTranslation from "next-translate/useTranslation";

export default function section1() {
    const {t} = useTranslation('common')

    return (
        <div className={`${style.section} ${style.state1}`}>
            <Animated animationIn="fadeIn" animationInDuration={3000} animationOut="fadeOut" animationInDelay={0}>
                <h2>{t`settings1text1`}</h2>
            </Animated>
            <Animated animationIn="fadeIn" animationInDuration={3000} animationOut="fadeOut" animationInDelay={200}>
                <p>{t`settings1text2`}</p>
            </Animated>
        </div>
    )
}
