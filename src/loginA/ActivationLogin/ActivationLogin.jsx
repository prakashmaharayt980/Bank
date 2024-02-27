import React from 'react';
import { useFormik } from 'formik';
import Inputbox from '../inputbox/inputbox';
import * as Yup from 'yup';
import Togglepassword from '../togglepassword/Togglepassword';
import '../ActivationLogin/Activation.css'
import glbimgD from '../loginimage/glbint.webp'


const initialValues={
    name:'',
    email:'',
    password:'',
    conform_password:'',
    Transction_pin:'',
    conform_Transction_pin:'',
    account:'',
    phone:''

}
const validateform= Yup.object().shape({
    name:Yup.string().required('Enter your name'),
    email:Yup.string().email().required('Enter your email'),

    password:Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/,"password must have lower-case cahr")
    .matches(/[A-Z]/,"password must have upper-case char")
    .matches(/[.`~!()-_@#$%^&*?]/,"password must have at least one special charter")
    .matches(/\d/, 'Password must have at least one number')
    .required('password is required'),

    conform_password:Yup.string().min(8, 'Password must be at least 8 characters').required('more char needed')
    .oneOf([Yup.ref('password'),null],"password must be matched"),

    Transction_pin:Yup.number()
    .max(4, 'Pin must be 4 characters')
    
    .required('pin is required'),

    conform_Transction_pin:Yup.number()
    .oneOf([Yup.ref('Transction_pin'),null],"pin must be matched")
    .required("pin is requirde"),

    account:Yup.number()
    .typeError('Account must be a number')
    .required("account number is required"),

    phone:Yup.number()
    .typeError('Account must be a number')
    .required("contact number is required")

})


const ActivationLogin = () => {
    const formik=useFormik({
        initialValues:initialValues,
        validationSchema:validateform,
        onSubmit:(value,action)=>{
            console.log("values",value);
            action.resetForm()
        }
    })

   
    return (
     
        <>
        <div className="formdiv scroll-smooth h-screen w-full" >
           
        <form className='forms-Activation' onSubmit={formik.handleSubmit}>
            <h1 id="header">Active your Account</h1>
            <p id="activation-details"  style={{
                textAlign:'center',
                fontSize:'16px'
                  }}
            >fill the details to apply for internet-banking serives </p>

           {/* input box of name */}
           <Inputbox
           name="name"
           type="text"
           placeholder={"Enter your name"}  
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}
           touched={formik.touched.name}
           value={formik.values.name}  
           label="Enter account holder name" 
           errormesg={formik.errors.name}
           
           />

          {/* input box of email */}
           <Inputbox
           name="email"
           type="email"
           placeholder={"Enter your email"}  
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}
           touched={formik.touched.email}
           value={formik.values.email}  
           label="Email" 
           errormesg={formik.errors.email}
           
           />

           {/* input box of password */}
        <div className="password-box">
        <label htmlFor="password" className='pasword-style-label'>Password</label>
           <Togglepassword
          
           name='password'
           type="password"
           placeholder={"Enter your password"}  
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}
           
           value={formik.values.password}  
           label="Password" 
           />
          {formik.errors.password && formik.touched.password?(<p className='errormessagebox' >{formik.errors.password}</p>):null}

        </div>
      {/* input box of conform_password */}
            <div className="password-box">
            <label htmlFor="conform_password" className='pasword-style-label' >Conform Password</label>
           <Togglepassword
           
           name='conform_password'
           type="password"
           placeholder={"Enter your Confrom password"}  
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}
           touched={formik.touched}
           value={formik.values.conform_password}  
           label="Conform_Password" 
           />
           {formik.errors.conform_password && formik.touched.conform_password?(<p className='errormessagebox' >{formik.errors.conform_password}</p>):null}
            </div>

            {/* input box of Transction pin */}
            <div className="password-box">
            <label htmlFor="Transction_pin" className='pasword-style-label'>Transction pin</label>
           
           <Togglepassword
           
           name='Transction_pin'
           type="password"
           placeholder={"Enter your Transction pin"}  
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}
           touched={formik.touched}
           value={formik.values.Transction_pin}  
           label="Transction_pin" 
           />

           {formik.errors.Transction_pin && formik.touched.Transction_pin?(<p className='errormessagebox' >{formik.errors.Transction_pin}</p>):null}
            </div>

             {/* input box of conform_Transction_pin */}
            <div className="password-box">
            <label htmlFor="conform_Transction_pin" className='pasword-style-label'>conform Transction pin</label>
           <Togglepassword
           
           name='conform_Transction_pin'
           type="password"
           placeholder={"Enter your conform Transction pin"}  
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}
           touched={formik.touched}
           value={formik.values.conform_Transction_pin}  
           label="conform_Transction_pin" 
           />
           {formik.errors.conform_Transction_pin && formik.touched.conform_Transction_pin?(<p className='errormessagebox' >{formik.errors.conform_Transction_pin}</p>):null}
            </div>

          {/* input box of account */}
          <Inputbox
           name="account"
           type="text"
           placeholder={"Enter your Account no"}  
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}
           touched={formik.touched.account}
           value={formik.values.account}  
           label="Account" 
           errormesg={formik.errors.account}
           />

           {/* input box of contact no */}
          <Inputbox
           name="phone"
           type="text"
           placeholder={"Enter your number"}  
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}
           touched={formik.touched.phone}
           value={formik.values.phone}  
           label="Contact no" 
           errormesg={formik.errors.phone}       
           />
           <button id='activation-btn' type='submit'>Apply</button>
          
        </form>
        <div className="imgdiv">
                <img src={glbimgD} alt="digital-img" />
    </div>
        </div>   
        </>
    );
}

export default ActivationLogin;
