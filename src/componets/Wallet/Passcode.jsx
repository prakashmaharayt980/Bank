import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
// import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Passcode({ onClose, formik ,errorMessage,sucessMeg}) {
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null),];
    const handleReset = () => {
        inputFields.forEach((input_name) => {
            formik.setFieldValue(input_name, ''); // Reset each input field value
        });
        onClose();
       
    };


    // run directly
    const handleUKeyButton = (e, index) => {
        const keypress = e.key
        const isNum = /^[0-9]$/.test(keypress)
        if (isNum) {
            if (keypress && index >= 0 && index < 3) {
                inputRefs[index + 1].current.focus()
            }

            e.preventDefault()
        }

        if (keypress === 'Backspace' && index === 3) {

            inputRefs[index].current.value = ''
            console.log(e);
            inputRefs[index - 1].current.focus()

        }
        if (keypress === 'Backspace' && index > 0 && index < inputRefs.length - 1) {
            inputRefs[index].current.value = ''
            inputRefs[index - 1].current.focus()

        }
        if (keypress === 'Backspace' && index === inputRefs.length - 1) {
            inputRefs[index].current.value = ''
            inputRefs[index - 1].current.focus()
        }

    }
    // Array of input names
    const inputFields = ['input_pin1', 'input_pin2', 'input_pin3', 'input_pin4'];

    return (
        <div >
            <h1 className='head-style-h1'>Confirm Your Pin</h1>
            <div className="pin-box flex flex-row gap-4 items-center justify-center my-5 mx-auto w-3/5">
                {inputFields.map((input_name, index) => (
                    <input
                        key={`${input_name}+${index}`}
                        ref={inputRefs[index]}
                        type="text"
                        value={formik.values[input_name]}
                        onChange={formik.handleChange}
                        maxLength='1'
                        onBlur={formik.handleBlur}
                        name={input_name}
                        onKeyUp={(e) => handleUKeyButton(e, index)}
                        style={{
                            border: '1px solid black',
                            borderRadius: '8px',
                            padding: '6px',
                            fontSize: '20px'
                        }}
                        className='aspect-square w-14 text-center'
                    />
                ))}
            </div>
            <div className="flex flex-row gap-3 justify-between ">
                <Button variant="contained" onClick={handleReset} className='input_wallet_button relative ' type='button' color='warning' endIcon={<Cancel />}>
                    Close
                </Button>
                <Button variant="contained" className='input_Bank_button ' type='submit' color='success' endIcon={<SendIcon />}>
                    Send
                </Button>
            </div>
            {
                errorMessage && (
                    <h1>{errorMessage} </h1>
                )
            }
            {
                sucessMeg && (
                    <h1>{sucessMeg} </h1>
                )
            }
        </div>
    );
}

export default Passcode;
