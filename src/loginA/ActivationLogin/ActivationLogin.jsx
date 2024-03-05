import React from 'react';
import { useFormik } from 'formik';
import Inputbox from '../inputbox/inputbox';
import * as Yup from 'yup';
import Togglepassword from '../togglepassword/Togglepassword';
import axios from 'axios'; // Import Axios
import '../ActivationLogin/Activation.css'
import glbimgD from '../loginimage/glbint.webp'

const initialValues = {
    name: '',
    email: '',
    password: '',
    account_number: '',
    phone_number: '',
    conform_password:''
}

const validateform = Yup.object().shape({
    name: Yup.string().required('Enter your name'),
    email: Yup.string().email().required('Enter your email'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, "password must have lower-case cahr")
        .matches(/[A-Z]/, "password must have upper-case char")
        .matches(/[.`~!()-_@#$%^&*?]/, "password must have at least one special charter")
        .matches(/\d/, 'Password must have at least one number')
        .required('password is required'),
    conform_password: Yup.string().min(8, 'Password must be at least 8 characters').required('more char needed')
        .oneOf([Yup.ref('password'), null], "password must be matched"),

    account_number: Yup.number()
        .typeError('Account must be a number')
        .required("account number is required"),

    phone_number: Yup.number()
        .typeError('Account must be a number')
        .required("contact number is required")
})

const ActivationLogin = () => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateform,
        onSubmit: async (values, actions) => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/register', values); // Use Axios to make a POST request
                console.log(response);
                if (response.status === 200) {
                    console.log('Data submitted successfully');
                    actions.resetForm();
                } else {
                    console.error('Failed to submit data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    })

    const inputBoxDetails = [
        { name: 'name', type: 'text', placeholder: 'Enter your name', label: 'Account-Holder Name' },
        { name: 'email', type: 'email', placeholder: 'Enter your email', label: 'Email' },
        { name: 'account_number', type: 'text', placeholder: 'Enter your Account no', label: 'Account_No' },
        { name: 'phone_number', type: 'number', placeholder: 'Enter your Number', label: 'Contact_no' },
        // { name: 'name', type: 'text', placeholder: 'Enter your name', label: 'Email' },
    ]

    const inputPassword = [
        { name: 'password', type: 'password', placeholder: 'Enter your password', label: 'password' },
        { name: 'conform_password', type: 'password', placeholder: 'Enter your conform_password', label: 'conform_password' },
    ]

    return (
        <>
            <div className="formdiv scroll-smooth h-screen w-full" >
                <form className='forms-Activation' onSubmit={formik.handleSubmit} method='post'>
                    <h1 id="header">Activate your Account</h1>
                    <p id="activation-details" style={{
                        textAlign: 'center',
                        fontSize: '16px'
                    }}>Fill the details to apply for internet-banking services</p>

                    {/* // Input box of name */}
                    {
                        inputBoxDetails.map((inputdata, index) => (
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
                        ))
                    }
                    {
                        inputPassword.map((passwordData, index) => (
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
                                {formik.errors[passwordData.name] && formik.touched[passwordData.name] ? (<p className='errormessagebox' >{formik.errors[passwordData.name]}</p>) : null}
                            </div>

                        ))
                    }

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
