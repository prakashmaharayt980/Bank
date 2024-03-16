import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';

function Pass_code({ onClose, formik }) {
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleReset = () => {
        onClose();
    };

    const handlekeys = (e, currentRef, nextRef, previousRef, currentIndex) => {
        const { key, target } = e;

        if (key === 'Backspace' && target.selectionStart === 0 && currentIndex > 0) {
            e.preventDefault();
            previousRef.current.focus();
        } else if (key === 'Backspace' && target.selectionStart === 0 && currentIndex === 0) {
            e.preventDefault();
        } else if (key === 'ArrowRight' && currentIndex > 0) {
            e.preventDefault();
            previousRef.current.focus();
        } else if (key === 'ArrowLeft' && currentIndex < inputRefs.length - 1) {
            e.preventDefault();
            nextRef.current.focus();
        } else if (currentRef.current.value.length >= 1 && currentIndex < inputRefs.length - 1) {
            nextRef.current.focus();
        }
    };

    // Array of input names
    const inputFields = ['input_pin1', 'input_pin2', 'input_pin3', 'input_pin4'];

    return (
        <div >
            <h1 className='head-style-h1'>Confirm Your Pin</h1>
            <div className="pin-box flex flex-row gap-4 items-center justify-center my-5 mx-auto w-3/5">
                {inputFields.map((input_name, index) => (
                    <input
                        key={input_name}
                        ref={inputRefs[index]}
                        type="password"
                        value={formik.values[input_name]}
                        onChange={formik.handleChange}
                        maxLength='1'
                        onBlur={formik.handleBlur}
                        name={input_name}
                        onKeyDown={(e) => handlekeys(e, inputRefs[index], inputRefs[index + 1], inputRefs[index - 1], index)}
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
            <Button variant="contained" onClick={handleReset} className='input_wallet_button relative left-16' type='button' color='warning' endIcon={<Cancel />}>
                Close
            </Button>
        </div>
    );
}

export default Pass_code;
