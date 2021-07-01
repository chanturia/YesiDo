import React from 'react';
import style from '/styles/Home.module.scss'
import styled from "styled-components";
import {Animated} from "react-animated-css";
import useTranslation from "next-translate/useTranslation";

const MainDiv = styled.div`
  display: flex;
`

const Text1 = styled.div`
  font-size: 2.7rem;
  font-weight: 300;
  margin: 27px 0px 0px 16px;
  letter-spacing: -3px;
`;
const Text2 = styled.div`
  font-size: 4.3rem;
  font-weight: 500;
  margin: 13px 0px 0px 16px;
  letter-spacing: -3px;
`;

const Text3 = styled.div`
  font-size: 3.2rem;
  font-weight: 400;
  margin: 13px 0 0 16px;
  letter-spacing: -3px;
`;

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Map = styled.div`
  border: 3px solid #274d4e;
  border-radius: 50%;
  height: 6rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  margin-left: 7rem;
  cursor: pointer;
  transition: all .4s;

  :hover {
    background: #274d4e;
    color: white;
  }
`
const mapUrl = 'https://www.google.com/maps/place/Ypanema/@38.0273584,22.8717234,18z/data=!4m5!3m4!1s0x0:0xa3665ba575930a00!8m2!3d38.02683!4d22.872204'
export default function section3() {
    const {t} = useTranslation('common')

    return (
        <div className={`${style.section} ${style.state3}`}>
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={0}
                          className={style.text1}>{t`settings3text1`}</Animated>
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={200}
                          className={style.text2}>Ypanema</Animated>
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={3000} animationInDelay={400}
                          className={style.text3}>{t`settings3text2`}</Animated>
            </div>
            <div className={style.mapWrapper}>
                <a href={mapUrl} target="_blank">
                    <Animated animationIn="fadeIn"
                              animationOut="fadeOut"
                              animationInDuration={3000}
                              animationInDelay={600}
                              className={style.map} onClick={() => {
                        alert("open Mao")
                    }}>
                        <span>Map</span>
                    </Animated>
                </a>
            </div>
        </div>
    )
}
