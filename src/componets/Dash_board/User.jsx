import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { MyContext } from '../../assets/Contextfile';
import './User.css';

function User() {

  const [visibleData, setVisibleData] = useState(false);
  const { user } = useContext(MyContext);

  const toggleVisibleData = () => {
    setVisibleData(prevState => !prevState);
  };
  

 


  return (
    <>
      


          <div className='user'>
            <div className="info-box">
              <div className="account-details">
                <p className='user-name'>{user?.user?.name}</p>
                <p className="value">{user?.user?.account_number}</p>
                <p className="value">Saving Account</p>
              </div>
              <div className="account-details">
                <p className="label">Interest Rate:</p>
                <p className="value">3.12%</p>
              </div>
            </div>

            <div className="info-box">
              <div className="account-details">
                <p className="label">Actual Amount:</p>
                <p className="value">{visibleData ? user?.user?.account_balance : 'XXXX.XX'}</p>
              </div>

              <div className="account-details">
                <p className="label">Accrued Interest:</p>
                <p className="value">{visibleData ? 12 : 'XXXX.XX'}</p>
              </div>
            </div>


            <div className="info-box">
              <div className="account-details">
                <p className="label">Current Amount:</p>
                <p className="value">{visibleData ? user?.user?.account_balance : 'XXXX.XX'}</p>
              </div>
              <FontAwesomeIcon icon={visibleData ? faEye : faEyeSlash} className="eye-icon" onClick={toggleVisibleData} />
            </div>
          </div>
      
    </>
  );
}

export default User;
