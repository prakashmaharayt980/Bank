import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faWallet, faArrowRightArrowLeft, faCreditCard, faPeopleRoof, faBook, faBars } from '@fortawesome/free-solid-svg-icons';
import glb from '../loginA/loginimage/glb.png';
import './Nav.css';

const Nav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={`m-0 p-0 side-nav-div ${isMobileMenuOpen?'show':'hide'} `} style={{
            boxShadow: 'rgba(24, 20, 21, 0.6) 2px 13px 9px'
        }}>
            <button className="toggle-menu-btn" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={faBars} className="bar-icon" color='gray' size='x' />
            </button>
            <nav className={`w-full nav-div ${isMobileMenuOpen?'show':'hide'} `}>
                <div className="logo-div relative top-3 ">
                    <img src={glb} className=' w-fit' alt="global-logo" />
                </div>
                <ul className='h-screen flex flex-col gap-4 justify-start mt-5'>
                    <li className='list-nav'>
                        <NavLink className='text-black  flex justify-start gap-4 justify-self-center' to='/' activeclassname="active">
                            <FontAwesomeIcon icon={faChartLine} className='mt-1' color='gray' size='x' />
                            <span className=' font-medium text-xl' >Dash-Board</span>
                        </NavLink>
                    </li>
                    <li className='list-nav'>
                        <NavLink className='text-black  flex justify-start gap-4 justify-self-center' to='/wallets' activeclassname="active">
                            <FontAwesomeIcon icon={faWallet} className='mt-1' color='gray' size='x' />
                            <span className='' >Wallet</span>
                        </NavLink>
                    </li>
                    <li className='list-nav'>
                        <NavLink className='text-black  flex justify-start gap-4 justify-self-center' to='#' activeclassname="active">
                            <FontAwesomeIcon icon={faArrowRightArrowLeft} className='mt-1' color='gray' size='x' />
                            <span className='' >Fund Transfer</span>
                        </NavLink>
                    </li>
                    <li className='list-nav'>
                        <NavLink className='text-black flex justify-start gap-4 justify-self-center' to='#' activeclassname="active">
                            <FontAwesomeIcon icon={faCreditCard} className='mt-1' color='gray' size='x' />
                            <span className='' >Cards</span>
                        </NavLink>
                    </li>
                    <li className='list-nav'>
                        <NavLink className='text-black  flex justify-start gap-4 justify-self-center' to='#' activeclassname="active">
                            <FontAwesomeIcon icon={faPeopleRoof} className='mt-1' color='gray' size='x' />
                            <span className='' >Corporate Management</span>
                        </NavLink>
                    </li>
                    <li className='list-nav'>
                        <NavLink className='text-black  flex justify-start gap-4 justify-self-center' to='#' activeclassname="active">
                            <FontAwesomeIcon icon={faBook} className='mt-1' color='gray' size='x' />
                            <span className='' >History</span>
                        </NavLink>
                    </li>
                    {/* Add other menu items here */}
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
