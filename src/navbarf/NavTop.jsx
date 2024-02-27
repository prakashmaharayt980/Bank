import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom'; 

const NavTop = () => {
    const navigate = useNavigate(); // Initialize useHistory hook

    const exitHandle = () => {
        navigate('/login'); // Redirect to the login page when exit button is clicked
    };

    return (
        <div className='flex justify-end align-middle  sticky w-screen' style={{ backgroundColor:'#f9f9f9',
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
