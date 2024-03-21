import React, { useContext, useState } from 'react';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Togglepassword from '../togglepassword/Togglepassword';
import AuthContext from '../../assets/AuthContext';
import { MyContext } from '../../assets/Contextfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const navigate = useNavigate();
    const Authtoken = useContext(AuthContext);
    const fetching = useContext(MyContext);

    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false); // State variable to track loading status

    const validationSchema = Yup.object({
        email: Yup.string().test(
            'is-email-or-phone',
            'Please enter a valid email address or phone number',
            function (value) {
                if (!value) return true; // If empty, validation will be handled by other fields
                // Check if the value looks like an email address
                if (value.includes('@')) {
                    return Yup.string().email().isValidSync(value);
                }
                // Otherwise, assume it's a phone number
                return Yup.string().matches(/^[0-9]+$/, 'Phone number must be numeric').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be at most 15 digits').isValidSync(value);
            }
        ).required('enter'),
        password: Yup.string().required("Please enter your password")
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, resetForm) => {
            // const url = 'http://192.168.1.77:8000/api/login/'; // Manish
             const url='https://my.api.mockaroo.com/users.json?key=60fc60d0&__method=POST' //testinf
            try {
                setLoading(true); // Set loading to true when form is submitted
                const response = await axios.post(url, values);

                if (response.status === 200) {
                    const data = response.data;
                    Authtoken.login(data.access_token);
                    fetching.fetchData();
                    localStorage.setItem('token', data.access_token);
                    console.log('Login response:', data);
                    navigate('/dashboard', { replace: true });
                }
            } catch (error) {
                setErrorMsg(error.message);
            } finally {
                setLoading(false); 
            }
        }
    });

    return (
        <form className='forms-login' onSubmit={formik.handleSubmit}>
            <div className="topbar">
                <img src='/glb.png' alt="img1" id='topimg' />
            </div>
            <div className="midbar">
                <div className="inputbar font-can">
                    <label htmlFor="email" className='label-login'>Email or Phone</label>
                    <input
                      
                        type="text"
                        name='email'
                        autoComplete='off'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='input-box-login'
                        placeholder='Enter your email or phone number'
                    />
                    {formik.errors.email && formik.touched.email && (<p className="errormessage">{formik.errors.email}</p>)}
                </div>
                <div className="inputbar" style={{ margin: '0px' }}>
                    <label htmlFor="password" className='label-login'>Password</label>
                    <Togglepassword
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={"Enter your password"}
                    />
                    {formik.errors.password && formik.touched.password && (<p className="errormessage">{formik.errors.password}</p>)}
                </div>
                {/* Conditionally render loading spinner or login button */}
                <button id="login" type='submit'>
                        {
                            loading?(<FontAwesomeIcon className='animate-spin mx-2' icon={faRotate}/> ):''
                        }login
                    </button>
                <div className="forgotten text-center">
                    <Link to="/activationlogin" className='forgotten-btn'>Not activated</Link>
                    <Link to="/forgotten" className='forgotten-btn'>Forgotten</Link>
                </div>
                {errorMsg && <h1>{errorMsg}</h1>}
            </div>
        </form>
    );
}

export default Login;
