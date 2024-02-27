import React from 'react';
import glb from '../loginimage/glb.png';
import './Login.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Togglepassword from '../togglepassword/Togglepassword';


  const initialValues={
    name:"",
    password:""
  }
  const validatedata=Yup.object({
      name:Yup.string().email()
    
      .required("please enter your username"),
      password:Yup.string().required("please enter your password")
  })




const Login = () => {
  

    const {values,errors,handleBlur,handleChange,handleSubmit,touched}=  useFormik({
        initialValues:initialValues,
        validationSchema:validatedata,
        onSubmit:(values,action)=>{
            console.log('formikvalues',values);
             action.resetForm()
        }
       
    });
    // console.log('error',errors)
   
    return (
      
        <>
       <form  className='forms-login' onSubmit={handleSubmit}>
        <div className="topbar">
            <img src={glb} alt="img1"  id='topimg'/>
        </div>
        <div className="midbar" >
            {/* <h1 className="titlemidbar">login</h1> */}
         <div className="inputbar">   
                <label htmlFor="name" className='label-login'>Email</label>
                <input type="text" name='name'
                autoComplete='off'
                values={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className='input-box-login'
                placeholder='Enter your email'
                />
               {errors.name && touched.name? (<p className="errormessage">{errors.name}</p>):null}
        </div>
         <div className="inputbar" style={{margin:'0px'}}>   
                <label htmlFor="name" className='label-login'>Password</label>
             <Togglepassword
             name='password'
             
             value={values.password}
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder={"enter your password"}
             

             />
           
               
            {errors.password && touched.password? (<p className="errormessage">{errors.password}</p>):null}
        </div>
      
        <button id="login" type='submit'>Login</button>
        <div className="forgotten text-center">
            <Link to="/activationlogin" className='forgotten-btn' >Not activated</Link>
            <Link to="/forgotten" className='forgotten-btn'>Forgotten</Link>
            </div>
        </div>
            
        </form>
        </>
    );
}

export default Login;
