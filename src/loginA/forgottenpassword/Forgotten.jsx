import React from 'react';
import Inputbox from '../inputbox/inputbox';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import '../forgottenpassword/forgottenf.css'
import glbs from '../loginimage/glb.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
    email: ''
}
const validationSchema = Yup.object({
    email: Yup.string().email().required('please enter your email')
})
const Forgotten = () => {
    const Formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (value) => {
            console.log('values', value);

        }
    })
    return (
        <>
            <div className="form-for-forgotten">
                <div className="logodiv">
                    <img src={glbs} alt="" />
                </div>

                <div className='forms-forgotten'>
                    <form action="" onSubmit={Formik.handleSubmit} className='forms'>
                        <p className="forgottendeatils" id='title-f'>Reset your password</p>
                        <div className="form-forgotten-input">
                            <Inputbox
                                name='email'
                                type='email'
                                label='Email'
                                placeholder='enter your email'
                                value={Formik.values.email}
                                errormesg={Formik.errors.email}
                                onBlur={Formik.handleBlur}
                                onChange={Formik.handleChange}
                                touched={Formik.touched.email}
                            />
                            <button type='submit' id="procced-btn"><FontAwesomeIcon icon={faArrowAltCircleRight} size='2x' /> </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Forgotten;
