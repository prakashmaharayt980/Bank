
import React, { useState } from 'react';
import {FaEyeSlash,FaEye} from 'react-icons/fa6'
import './Togglepassword.css'


const Togglepassword = ({name,value,onChange,onBlur,placeholder}) => {
   const[showpassword,setshowpassword]=useState(false);

   const Toggleshowpassword=()=>{
       setshowpassword(!showpassword);
   }
 
 return(
 <div >
    <input className='pass-word-input'
    name={name} 
    autoComplete="off"
    type={showpassword?'text':'password'}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    placeholder={placeholder}  
    />
    {showpassword?(<FaEyeSlash className='eye-btn fa-lg'  onClick={Toggleshowpassword}/>):(<FaEye className='eye-btn'  onClick={Toggleshowpassword}/>)}

   
 </div>)
 
 
}

export default Togglepassword;
