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
                {state.currentUser.amComing === 'yes' &&
                <span>{t(`coming text`)}</span>
                }
                {state.currentUser.amComing === 'no' &&
                <span>{t(`not coming text`)}</span>
                }
            </Animated>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={200}>
                <span>{t('save site')}</span>
            </Animated>
        </>
    );
}


export default FormState3;
