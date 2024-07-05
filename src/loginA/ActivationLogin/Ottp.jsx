import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { Button, Alert, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialValuesOttp, validationSchemaOttp } from '../../assets/RequiredValidationFormik';
import { urlOttp } from '../../assets/RequiredUrlOfBackend';

const Ottp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    console.log('ottpda', data);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { handleChange, handleBlur, values, handleSubmit, resetForm } = useFormik({
        initialValues: initialValuesOttp,
        validationSchema: validationSchemaOttp,
        onSubmit: async (values) => {
            setSuccessMsg('');
            setErrorMsg('');
            try {
                const otp = values.input_Ottp1 + values.input_Ottp2 + values.input_Ottp3 + values.input_Ottp4;
                const response = await axios.post(urlOttp, { otp, email: data?.email });
                console.log('ottpsend', response);

                if (response.status === 200 && !response.data.error) {
                    setSuccessMsg(response.data.message);
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 3000);
                } else {
                    setErrorMsg(response.data.error || 'An unknown error occurred.');
                }
            } catch (error) {
                setErrorMsg(error.response?.data.message || error.message);
            }
        }
    });

    const inputField = Object.keys(initialValuesOttp);
    const inputRef = useRef([]);

    const handleUpKey = (e, index) => {
        const keypress = e.key;
        const isNum = /^[0-9]$/i.test(keypress);

        if (isNum) {
            if (keypress && index >= 0 && index < 3) {
                inputRef.current[index + 1].focus();
            } else if (keypress && index === 3) {
                inputRef.current[index].focus();
            }
        }
        if (keypress === 'Backspace' && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const handleInputChange = (e) => {
        handleChange(e);
        setSuccessMsg('');
        setErrorMsg('');
    };

    return (
        <form className='flex justify-center items-center flex-col gap-3 h-80vh w-4/5 mx-auto my-4 z-index-top box-design' onSubmit={handleSubmit}>
            <h1 className='headtitle'>Verify</h1>
            <p>Ottp is sent to your {data?.phone_number}, please enter your ottp to validate</p>
            <div className="inputottp flex flex-row gap-4 items-center justify-center my-5 mx-auto w-3/5">
                {inputField.map((inputOttp, index) => (
                    <input
                        key={index}
                        type="text"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={values[inputOttp]}
                        name={inputOttp}
                        maxLength="1"
                        onKeyUp={(e) => handleUpKey(e, index)}
                        style={{
                            border: '1px solid black',
                            borderRadius: '8px',
                            padding: '6px',
                            fontSize: '20px'
                        }}
                        className='aspect-square w-14 text-center'
                        ref={(ref) => (inputRef.current[index] = ref)}
                    />
                ))}
            </div>
            <Button variant="contained" className='input_Bank_button' type='submit' color='success' endIcon={<SendIcon />}>
                Send
            </Button>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {successMsg && <Alert severity="success" className='text-cyan-300'>{successMsg}</Alert>}
                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            </Stack>
        </form>
    );
};

export default Ottp;
