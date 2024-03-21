
import React from 'react';
import './inputbox.css'


const Inputbox = ({label,name,placeholder,onChange,onBlur,errormesg,type,touched,value}) => {
       
    return (
        <div className='input-box font-can'>
            <label htmlFor={name} className='label-input-box' >{label}</label>
            <input
            className='input-input-box'
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}            
             type={type}
             touched={value.toString()}
             value={value}
             /> 
             {errormesg && touched?(<p className='errormessagebox' >{errormesg}</p>):null}
            

        </div>
    );
}

export default Inputbox;
