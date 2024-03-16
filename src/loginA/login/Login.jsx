import React, { useContext, useState } from 'react';
import glb from '../loginimage/glb.png';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import Togglepassword from '../togglepassword/Togglepassword';
import AuthContext from '../../assets/AuthContext';
import { MyContext } from '../../assets/Contextfile';

const Login = () => {
    const navigate = useNavigate();
    const Authtoken = useContext(AuthContext);
    
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false); // State variable to track loading status

    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string().email().required("Please enter a valid email address"),
        password: Yup.string().required("Please enter your password")
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, resetForm) => {
            // const url = 'https://dummyjson.com/auth/login'; // Example URL
            const url='http://192.168.1.77:8000/api/login/'
            try {
                setLoading(true); // Set loading to true when form is submitted
                const response = await axios.post(url, values);

                if (response.status === 200) {
                    const data = response.data;
                   Authtoken.login(data.access_token);
                   
                     localStorage.setItem('token',data.access_token)
                    console.log('Login response:', data.id);
                    navigate('dashboard', { replace: true });
                }
            } catch (error) {
                setErrorMsg(error.message);
            } finally {
                setLoading(false); // Set loading to false after API response
            }
        }
    });

    return (
        <form className='forms-login' onSubmit={formik.handleSubmit}>
            <div className="topbar">
                <img src={glb} alt="img1" id='topimg' />
            </div>
            <div className="midbar">
                <div className="inputbar">
                    <label htmlFor="email" className='label-login'>email</label>
                    <input
                        type="text"
                        name='email'
                        autoComplete='off'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='input-box-login'
                        placeholder='Enter your email'
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
                {loading ? (
                    <LoadingButton loading variant="outlined" >
                        Login
                    </LoadingButton>
                ) : (
                    <button id="login" type='submit'>
                        Login
                    </button>
                )}
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
