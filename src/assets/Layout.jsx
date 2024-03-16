import React, { useContext } from 'react';
import Nav from '../navbarf/Nav';
import { Outlet } from 'react-router-dom';
import NavTop from '../navbarf/NavTop';
import AuthContext from './AuthContext';

const Layout = () => {
    const Authislogin = useContext(AuthContext)
    return (
        <>
            {
                Authislogin.isLoginedIn && (
                    <div className="main w-full h-screen flex flex-row justify-start"
                        style={{
                            scrollSnapType: 'y mandatory',
                        }}
                    >
                        <div className="leftdata h-screen" style={{ width: '300px' }}>
                            <Nav />
                        </div>
                        <div className="Rightdata  flex-1 scroll-smooth  h-screen " style={{
                        }}>
                            <NavTop />
                            <Outlet style={{ scrollY: 'scroll', scrollSnapType: 'start' }} />
                        </div>

                    </div>
                )
            }

        </>
    );
}

export default Layout;
