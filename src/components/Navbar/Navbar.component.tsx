import React, {FC, useState} from 'react';
import './Navbar.css'
import {Link} from "react-router-dom";
import BookSvg from '../../assets/book-opened.svg'

export const NavBar: FC = () => {
    const [showHamburger, setShowHamburger] = useState(false);

    return (
        <nav className="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className='link' to='/'>
                    <div className="navbar-item">
                        <img src={BookSvg} alt=""/>
                        <h6 className='navbar-title'>Lakota Language Learning</h6>
                    </div>
                </Link>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbar-target" onClick={() => {
                    setShowHamburger(!showHamburger)
                }}>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            </div>
            <div id="navbar-target"
                 className={`navbar-menu ${showHamburger ? 'is-active' : ''}`}>
                <div className='navbar-end'>
                    <div className='is-divider navbar-divider'/>

                    <Link to='/' className='link navbar-item-hover' onClick={() => setShowHamburger(false)}>
                        <div className='navbar-item'>Home</div>
                    </Link>

                    <Link to='/lessons' className='link navbar-item-hover' onClick={() => setShowHamburger(false)}>
                        <div className='navbar-item'>Lessons</div>
                    </Link>


                    <Link to='/FAQ' className='link navbar-item-hover' onClick={() => setShowHamburger(false)}>
                        <div className='navbar-item'>FAQ</div>
                    </Link>


                    <Link to='/about' className='link navbar-item-hover' onClick={() => setShowHamburger(false)}>
                        <div className='navbar-item'>About</div>
                    </Link>
                </div>
            </div>
        </nav>
    )
};