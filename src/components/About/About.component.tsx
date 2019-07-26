import React from 'react'
import {FC} from 'react';
import TwitterSvg from '../../assets/twitter.svg'
import FacebookSvg from '../../assets/facebook.svg'
import './About.css'

export const About: FC = () => {
    return <div className='container'>
        <h1 className='title'>About</h1>
        <div className='content'>
            <b>Social Media:</b>
            <br/>
            <div className="buttons">
                <a href='https://twitter.com/andrea_lakota' rel='noopener' className="button is-rounded twitter-icon">
                    <img src={TwitterSvg} alt=''/>
                </a>
                <a href='https://twitter.com/andrea_lakota' rel='noopener' className="button is-rounded facebook-icon">
                    <img src={FacebookSvg} alt=''/>
                </a>
            </div>
            <div>


            </div>
        </div>
    </div>
};
