import React from 'react'
import { TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


const AmountInputDiv = ({ selectedMethod, input_Method, handleButtonTrack, Method_label, readonly, formik }) => {
    return (
        <div className="Method-input-box my-2 flex flex-col items-center justify-center mx-3  " style={{width:'450px'}}>
            {selectedMethod && input_Method.map((input_W, index) => (
                <div   style={{width:'450px',margin:'10px 0' }} >
                    <TextField
                    key={`${input_W}${index}`}
                        value={formik.values[input_W.name]}
                        name={input_W.name}
                        type={input_W.type}
                        label={input_W.id === 1 ? `${Method_label} ${input_W.label}` : input_W.label}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={readonly}
                        touched={formik.touched[input_W.name] ? "true" : "false"}
                        error={formik.errors[input_W.name] && formik.touched[input_W.name]}
                        variant="outlined" 
                        style={{ marginLeft: '10px',width:'100%' }}
                        />

                    {formik.errors[input_W.name] && formik.touched[input_W.name]? (<div>{formik.errors[input_W.name]}</div>) : null}
                </div>
            ))}
            {selectedMethod && (
                <Button variant="contained" onClick={()=>handleButtonTrack()} color='success' 
                className='input_Method_button' type='button' endIcon={<SendIcon />}>
                    Continue
                </Button>
            )}
        </div>
    )
}

export default AmountInputDiv
