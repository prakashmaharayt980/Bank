import React, { useEffect, useState } from 'react';
import { getUser } from '../../assets/Apicall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import './User.css'

function User() {
  const [user, setUser] = useState(null);
  const [visibledata,setvisibledata]=useState(false)

  
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const datavisible=()=>{
   setvisibledata(!visibledata)
  
  }

  return (
    <div className='user'>
      

      <div className="info-box">
        <div className="account-details">
          <p className='user-name'>{user.name}</p>          
          <p className="value">{user.accountNumber}</p>
          <p className="value">{user.banktype}</p>
        </div>
        <div className="account-details">
          <p className="label">Interest Rate:</p>
          <p className="value">{user.Irate}</p>
        </div>

      </div>

      <div className="info-box">
      <div className="account-details">
          <p className="label">Actual Amount:</p>
          <p className="value">{visibledata? user.ActualAmount:'XXXX.XX'}</p>
        </div>    

        <div className="account-details">
          <p className="label">Accrued Interest:</p>
          <p className="value">{visibledata?user.AccrudeAmount:'XXXX.XX'}</p>
        </div>
    </div>

      <div className="info-box">   
        <div className="account-details">
          <p className="label">Current Amount:</p>
          <p className="value">{visibledata? user.CurrentAmount:'XXXX.XX'}</p>
        </div>
        {visibledata?(<FontAwesomeIcon icon={faEye} className="eye-icon" onClick={datavisible} />): (<FontAwesomeIcon icon={faEyeSlash} className="eye-icon" onClick={datavisible} />)}
      </div>

     
    </div>
  );
}

export default User;
