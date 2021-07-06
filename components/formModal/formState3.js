import React, {useContext, useEffect} from 'react';
import style from '/styles/Home.module.scss'
import useTranslation from 'next-translate/useTranslation'
import {Animated} from "react-animated-css";
import axios from 'axios';
import {Context} from "/store/Store";


function FormState3() {
    const {t} = useTranslation('common')
    const [state, dispatch] = useContext(Context);

    return (
        <>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={0}>
                <span>{`Thanks A lot that you inform us that you are ${state.currentUser.amComing === 'yes' ? 'coming' : 'not coming'}`}</span>
            </Animated>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={200}>
                <span>Save this site because after the wedding we will upload pictures and videos here</span>
            </Animated>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={400}>
                <span>we wish you the best and take care</span>
            </Animated>
        </>
    );
}



export default FormState3;
