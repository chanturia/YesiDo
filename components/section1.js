import React from 'react';
import style from '/styles/Home.module.scss'
import {Animated} from "react-animated-css";

export default function section1() {
    return (
        <div className={`${style.section} ${style.state1}`}>
            <Animated animationIn="fadeIn" animationInDuration={3000} animationOut="fadeOut" animationInDelay={0}>
                <h2>Είπαμε ναι!</h2>
            </Animated>
            <Animated animationIn="fadeIn" animationInDuration={3000} animationOut="fadeOut" animationInDelay={200}>
                <p>
                    Θα χαρούμε να βρεθείτε στην
                    γαμήλια γιορτή μας
                    να μοιραστείτε τη χαρά μας!
                </p>
            </Animated>
        </div>
    )
}
