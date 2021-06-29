import React from 'react';
import style from '/styles/Home.module.scss'
import {Animated} from "react-animated-css";

export default function section2() {
    return (
        <div className={`${style.section} ${style.state2}`}>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={0} className={style.text1}>Παρασκευή</Animated>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={200} className={style.text2}>13 ΑΥΓΟΥΣΤΟΥ 2021</Animated>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={400} className={style.text3}>Ώρα 19:30</Animated>
        </div>
    )
}
