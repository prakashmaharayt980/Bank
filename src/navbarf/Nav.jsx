import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {navlinkpath} from '../assets/RequiredDataBase'
import { faBars } from '@fortawesome/free-solid-svg-icons';


import './Nav.css';

const Nav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={`m-0 p-0 side-nav-div h-screen  ${isMobileMenuOpen ? 'show' : 'hide'} `} style={{
            scrollSnapType: 'y mandatory',

            // position:'absolute',
            boxShadow: 'rgba(24, 20, 21, 0.6) 2px 13px 9px'
        }}>
            <button className="toggle-menu-btn " onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={faBars} className="bar-icon" color='gray' size='2x' />
            </button>
            <nav className={`w-full nav-div ${isMobileMenuOpen ? 'show' : 'hide'} `}>
                <div className="logo-div relative top-3 ">
                    <img src='./glb.png' className=' w-fit' alt="global-logo" />
                </div>
                <ul className='h-screen flex flex-col gap-4 justify-start mt-5'>
                    {
                        navlinkpath.map((link, index) => (
                            <li className='list-nav' key={index}>
                                <NavLink className='text-black  flex justify-start gap-4 justify-self-center' to={link.to} activeclassname="active">
                                    <FontAwesomeIcon icon={link.icon} className='mt-1' color='gray' size='1x' />
                                    <span className=' font-medium text-xl' >{link.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
