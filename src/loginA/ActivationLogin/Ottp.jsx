import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { Button, Alert, Stack} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {initialValuesOttp,validationSchemaOttp} from '../../assets/RequiredValidationFormik'
import {urlOttp} from '../../assets/RequiredUrlOfBackend'

const Ottp = ({ email }) => {
    const navigatie = useNavigate()
    const [SuccessMsg, setSuccessMsg] = useState()
    const [errorMsg, seterrorMsg] = useState()

   
    const { handleChange, handleBlur, values, handleSubmit } = useFormik({
        initialValues:initialValuesOttp,
        validationSchema:validationSchemaOttp,
        onSubmit: async (values) => {

            try {
               
                const response = axios.post(urlOttp, { values })

                if (response.ok) {
                    if (response.error) {
                        seterrorMsg(response.error)
                    } else {
                        setSuccessMsg('Success')
                        setTimeout(() => {
                            navigatie('/', { replace: true })
                        }, 3000);
                    }
                }

            } catch (error) {
                seterrorMsg(error.message)
            }
        }
    })


    const inputfield = Object.keys(initialValuesOttp)
    const inputref = useRef([])

    const handleUpkey = (e, index) => {
        const keypress = e.key
        const isNum = /^[0-9]$/i.test(keypress)
        e.preventDefault()
        if (isNum) {
            if (keypress && index >= 0 && index < 3) {
                inputref.current[index + 1].focus()
            }
            if (keypress && index === 3) {
                inputref.current[index].focus()
            }
        }
        if (keypress === 'Backspace' && index > 0 && index < 3) {
            inputref.current[index - 1].focus()
        }
        if (keypress === 'Backspace' && index === 3) {
            inputref.current[index - 1].focus()
        }

    }
    return (
        <form className='flex justify-center items-center flex-col gap-3 h-80vh w-4/5 mx-auto my-4 z-index-top box-design' onSubmit={handleSubmit}>
            <h1 className='headtitle'>Verify</h1>
            <p>Ottp is send to your {email},please enter your ottp to vaildate</p>
            <div className="inputottp  flex flex-row gap-4 items-center justify-center my-5 mx-auto w-3/5">
                {
                    inputfield.map((inputottp, index) => (
                        <input
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[inputottp]}
                            name={inputottp}
                            maxLength="1"
                            onKeyUp={(e) => handleUpkey(e, index)}
                            style={{
                                border: '1px solid black',
                                borderRadius: '8px',
                                padding: '6px',
                                fontSize: '20px'
                            }}
                            className='aspect-square w-14 text-center'
                            ref={(ref) => (inputref.current[index]) = ref}
                        />
                    ))
                }
            </div>
            <Button variant="contained" className='input_Bank_button ' type='submit' color='success' endIcon={<SendIcon />}>
                Send
            </Button>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {
                    (SuccessMsg != null) && (
                        <Alert severity="success" className=' text-cyan-300'>{SuccessMsg} </Alert>
                    )
                }
                {
                    (errorMsg != null) && (
                        <Alert severity="error">{errorMsg}</Alert>
                    )
                }
            </Stack>

        </form>
    )
}

export default Ottp
