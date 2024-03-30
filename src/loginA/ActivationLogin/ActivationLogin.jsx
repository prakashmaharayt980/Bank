import React, { useState } from 'react';
import { useFormik } from 'formik';
import Inputbox from '../inputbox/inputbox';
import Togglepassword from '../togglepassword/Togglepassword';
import './Activation.css';
import { initialValues, validateform } from '../../assets/RequiredValidationFormik'
import { Alert, Stack } from '@mui/material';
import { inputBoxDetails, inputPassword } from '../../assets/RequiredDataBase'
import { urlActivation } from '../../assets/RequiredUrlOfBackend'
import axios from 'axios';

const ActivationLogin = ({ handledata }) => {
    const [errorMsg, seterrorMsg] = useState()

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateform,
        onSubmit: async (values, e) => {
            //    e.preventDefaults()
            try {
                const response = await axios.post(urlActivation, { values }, {
                    ContentType: 'application/json'
                })

                if (response === 200) {
                    setTimeout(() => {
                        handledata(values)
                    }, 3000);
                }

            } catch (error) {
                seterrorMsg(error)
            }
        }
    })

    return (

        <>
            <div className="formdiv scroll-smooth  w-1/2 mx-auto my-4  box-design flex-col flex  justify-center items-center ">
                <h1 id="header" className='headtitle'>Activate your Account</h1>
                <p id="activation-details" style={{
                    textAlign: 'center',
                    fontSize: '16px'
                }}>Fill the details to apply for internet-banking services</p>
                <form className='forms-Activation grid grid-cols-2 place-content-center gap-3 font-can' onSubmit={formik.handleSubmit} >


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
                        <div className="password-box font-can" key={index}>
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

                    <button id='activation-btn' className='flex text-white my-3 bg-green-700 text-center align-middle box-desing col-auto' type='submit'>Apply</button>
                </form>
                <Stack sx={{ width: '100%' }} spacing={2}>

                    {
                        (errorMsg != null) && (
                            <Alert severity="error">{errorMsg}</Alert>
                        )
                    }
                </Stack>

            </div>


        </>




    );
}

export default ActivationLogin;
