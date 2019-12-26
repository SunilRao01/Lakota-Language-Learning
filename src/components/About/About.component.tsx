import React from 'react'
import {FC} from 'react';
import TwitterSvg from '../../assets/twitter.svg'
import FacebookSvg from '../../assets/facebook.svg'
import './About.css'

export const About: FC = () => {
    return <div className='container'>
        <h1 className='title'>About</h1>
        <div className='content'>
            <p>I’m Hiŋskéhaŋska. I’m Lakȟóta, born and raised on Salish land in the present-day state of Washington. My
                mother and uncle are from Bismark, and my Grandma is from McLaughlin, South Dakota. At university I
                studied Spanish language literature, linguistics, and culture. During university, I finally felt the
                need to learn Lakȟótiyapi, a language that nobody in my family speaks, due to the attendance of my
                grandmother’s grandmother at the Benedictine Agricultural Boarding School in Kenel. I’ve been learning
                the language for a couple years now.</p>
            <b>Social Media:</b>
            <br/>
            <div className="buttons">
                <a href='https://twitter.com/LanguageLakota' rel='noopener'
                   className="button is-rounded is-medium twitter-icon" target='_blank'>
                    <img src={TwitterSvg} alt=''/>
                </a>
                <a href='https://www.facebook.com/Lakota-Language-Learning-111490473688572' rel='noopener'
                   className="button is-rounded is-medium facebook-icon" target='_blank'>
                    <img src={FacebookSvg} alt=''/>
                </a>
            </div>
            <div>
            </div>
        </div>
    </div>
};
