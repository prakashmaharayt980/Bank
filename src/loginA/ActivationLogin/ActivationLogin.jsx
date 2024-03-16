import React, { useContext } from 'react';
import { useFormik } from 'formik';
import Inputbox from '../inputbox/inputbox';
import * as Yup from 'yup';
import Togglepassword from '../togglepassword/Togglepassword';
import axios from 'axios';
import '../ActivationLogin/Activation.css';
import glbimgD from '../loginimage/glbint.webp';
import { MyContext } from '../../assets/Contextfile';
import { useNavigate } from 'react-router-dom';


const initialValues = {
    name: '',
    email: '',
    password: '',
    account_number: '',
    phone_number: '',
    conform_password: '',
    transaction_pin: '',
    conform_transaction_pin: ''
}

const validateform = Yup.object().shape({
    name: Yup.string().required('Enter your name'),
    email: Yup.string().email().required('Enter your email'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, "password must have lower-case char")
        .matches(/[A-Z]/, "password must have upper-case char")
        .matches(/[.`~!()-_@#$%^&*?]/, "password must have at least one special character")
        .matches(/\d/, 'Password must have at least one number')
        .required('Password is required'),
    conform_password: Yup.string().min(8, 'Password must be at least 8 characters').required('More characters needed')
        .oneOf([Yup.ref('password'), null], "Passwords must match"),

    transaction_pin: Yup.number().required('Transaction PIN is required'),
    conform_transaction_pin: Yup.number().required('More characters needed')
        .oneOf([Yup.ref('transaction_pin'), null], "PINs must match"),

    account_number: Yup.number()
        .typeError('Account must be a number')
        .required("Account number is required"),

    phone_number: Yup.number()
        .typeError('Account must be a number')
        .required("Contact number is required")
})

const ActivationLogin = () => {
    // const { data, setData } = useContext(MyContext);
    const nagviation=useNavigate()

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateform,
        onSubmit: async (values, action) => {
            try {
                const response = await fetch('http://192.168.1.77:8000/api/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify(values)
                });

                // Assuming you want to handle the response here
               if(response.ok){
                const data = await response.json();
                console.log('re response:', data);
                nagviation('/')

               }

            } catch (error) {
                console.error('Error during login:', error);
            }

        }
    })

    const inputBoxDetails = [
        { name: 'name', type: 'text', placeholder: 'Enter your name', label: 'Account-Holder Name' },
        { name: 'email', type: 'email', placeholder: 'Enter your email', label: 'Email' },
        { name: 'account_number', type: 'text', placeholder: 'Enter your Account no', label: 'Account_No' },
        { name: 'phone_number', type: 'tel', placeholder: 'Enter your Number', label: 'Contact_no' },
    ]

    const inputPassword = [
        { name: 'password', type: 'password', placeholder: 'Enter your password', label: 'password' },
        { name: 'conform_password', type: 'password', placeholder: 'Enter your conform_password', label: 'conform_password' },
        { name: 'transaction_pin', type: 'password', placeholder: 'Enter your pass', label: 'P password' },
        { name: 'conform_transaction_pin', type: 'password', placeholder: 'Enter your P conform_password', label: 'P conform_password' },
    ]

    return (
        <>
            <div className="formdiv scroll-smooth h-screen w-full">
                    <form className='forms-Activation' onSubmit={formik.handleSubmit} >
                        <h1 id="header">Activate your Account</h1>
                        <p id="activation-details" style={{
                            textAlign: 'center',
                            fontSize: '16px'
                        }}>Fill the details to apply for internet-banking services</p>

                        {inputBoxDetails.map((inputdata, index) => (
                            <Inputbox
                                key={index}
                                name={inputdata.name}
                                type={inputdata.type}
                                placeholder={inputdata.placeholder}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                touched={formik.touched[inputdata.name]}
                                value={formik.values[inputdata.name]}
                                label={inputdata.label}
                                errormesg={formik.errors[inputdata.name]}
                            />
                        ))}

                        {inputPassword.map((passwordData, index) => (
                            <div className="password-box" key={index}>
                                <label htmlFor={passwordData.name} className='pasword-style-label'>{passwordData.label} </label>
                                <Togglepassword
                                    name={passwordData.name}
                                    type={passwordData.type}
                                    placeholder={passwordData.placeholder}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values[passwordData.name]}
                                    label={passwordData.label}
                                />
                                {formik.errors[passwordData.name] && formik.touched[passwordData.name] ? (<p className='errormessagebox'>{formik.errors[passwordData.name]}</p>) : null}
                            </div>
                        ))}

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
