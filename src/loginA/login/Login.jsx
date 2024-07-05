import React, { useContext, useState } from 'react';
import './Login.css';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {urlLogin} from '../../assets/RequiredUrlOfBackend'
import Togglepassword from '../togglepassword/Togglepassword';
import AuthContext from '../../assets/AuthContext';
import { MyContext } from '../../assets/Contextfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import {validationSchemaLogin,initialValuesLogin} from '../../assets/RequiredValidationFormik'

const Login = () => {
    const navigate = useNavigate();
    const Authtoken = useContext(AuthContext);
    const fetching = useContext(MyContext);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false); // State variable to track loading status

    

    const formik = useFormik({
       initialValues:initialValuesLogin,
        validationSchema: validationSchemaLogin,
        onSubmit: async (values, resetForm) => {
           
            try {
                setLoading(true); 
                const response = await axios.post(urlLogin, values); 
                console.log( 'res',response)
                if (response.status === 200) {
                    // const data = response.data;
                    localStorage.setItem('token', response?.data?.access_token);                         
                        localStorage.setItem('user',response.data)  
                    
                }
                if(localStorage.getItem('token') !==null){
                    fetching.fetchData() 
                    navigate('/dash', { replace: true });
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
              <span className=' text-center w-full text-2xl text-blue-700 underline'>ABC Bank</span>
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
