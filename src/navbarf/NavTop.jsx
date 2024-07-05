import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import {  useNavigate } from 'react-router-dom'; 
import AuthContext from '../assets/AuthContext';

const NavTop = () => {
  const AuthLog= useContext(AuthContext)
  const nagvi=useNavigate()

    const exitHandle = () => {
       localStorage.clear('token')
       localStorage.removeItem('token')
      nagvi('/login',{replace:true})
               
    };

    return (
        <div className='flex justify-end align-middle   w-full ' style={{ backgroundColor:'#f9f9f9',
        height: '46px' ,
   
        boxShadow:' rgba(24, 20, 21, 0.5) 1px 5px 14px' 
        }}>
            <li className='list-none tooltip'>
                
                <FontAwesomeIcon
                    icon={faArrowRight}
                    size="2x"
                    color='black'
                    className='right-10 relative top-1 exit-btn' 
                    onClick={exitHandle} // Call exitHandle function when exit button is clicked
                />
                <Tooltip anchorSelect='.exit-btn' content='Exit' />
            </li>
        </div>
    );
}

export default NavTop;
