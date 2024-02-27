import React from 'react';
import Nav from '../navbarf/Nav';
import { Outlet } from 'react-router-dom';
import NavTop from '../navbarf/NavTop';

const Layout = () => {
    return (
        <>
        <div className="main w-full h-full flex flex-row">
           <div className="leftdata   " style={{width:'300px'}}>
           <Nav/>
           </div>
           <div className="Rightdata  flex-1 scroll-smooth">
            <NavTop/>
           <Outlet/>
           </div>

        </div>
            
        </>
    );
}

export default Layout;
