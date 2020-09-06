import React from 'react';
import { FC } from 'react';
import { TwitterSVG, FacebookSVG } from 'assets';
import styles from './About.module.scss';

export const About: FC = () => {
    return (
        <div className="container">
            <h1 className="title">About</h1>
            <div className="content">
                <p>
                    I’m Alex. I’m Lakȟóta, born and raised on Salish land in the
                    present-day state of Washington. My mother and uncle are
                    from Bismark, and my Grandma is from McLaughlin, South
                    Dakota. At university I studied Spanish language literature,
                    linguistics, and culture. During university, I finally felt
                    the need to learn Lakȟótiyapi, a language that nobody in my
                    family speaks, due to the attendance of my grandmother’s
                    grandmother at the Benedictine Agricultural Boarding School
                    in Kenel. I’ve been learning the language for a couple years
                    now.
                </p>
                <p>
                    If you have any questions or would like to discuss anything,
                    please reach out to me via{' '}
                    <a href="mailto:lakotalanguagelearning@gmail.com">
                        lakotalanguagelearning@gmail.com
                    </a>
                </p>
                <b>Social Media:</b>
                <br />
                <br />
                <div className="buttons">
                    <a
                        href="https://twitter.com/LanguageLakota"
                        className={`button is-rounded is-medium ${styles.TwitterIcon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={TwitterSVG} alt="" />
                    </a>
                    <a
                        href="https://www.facebook.com/Lakota-Language-Learning-111490473688572"
                        className={`button is-rounded is-medium ${styles.FacebookIcon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={FacebookSVG} alt="" />
                    </a>
                </div>
            </div>
        </div>
    );
};
