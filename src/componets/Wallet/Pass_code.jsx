import React from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';

const pin1 = 1;
const pin2 = 3;
const pin3 = 2;
const pin4 = 1;



const input_Pin_values = [
    { name: "input_pin1" },
    { name: "input_pin2" },
    { name: "input_pin3" },
    { name: "input_pin4" },
];

const initialValues = {
    input_pin1: '',
    input_pin2: '',
    input_pin3: '',
    input_pin4: '',
};

const validationSchema = Yup.object({
    input_pin1: Yup.number().required("required"),
    input_pin2: Yup.number().required("required"),
    input_pin3: Yup.number().required("required"),
    input_pin4: Yup.number().required("required")
})

const handlekeys=(e,currentRef,nextRef,perviousRef)=>{
  const {key,target}=e
  if(key==='Backspace' && target.selectionStart===0 && target.selectionEnd===0){
    e.preventDefault()
    perviousRef.current.focus()
    // values[currentRef.current.name]=''
    // handleChange({ target: { name: currentRef.current.name, value: '' } });
  }else if(currentRef.current.value.length >=1){
    nextRef.current.focus()
  }
}


function Pass_code() {
     
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const { values, handleBlur, handleChange, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            
        }
    });

   

    return (
        <div className=' flex justify-center items-center flex-col gap-3 h-80vh w-4/5 mx-auto my-4 Z-index-top box-design'>
            <form method="post">
                <h1 className='head-style-h1'>Confrom Your Pin</h1>
                <div className="pin-box flex flex-row gap-4 items-center justify-center my-5 mx-auto  w-3/5 ">
                    {input_Pin_values.map((input_div, index) => (
                        <input
                            key={index} 
                            ref={inputRefs[index]}
                            type="password"
                            value={values[input_div.name]}
                            onChange={handleChange}
                            maxLength='1'
                            onBlur={handleBlur}
                            name={input_div.name}
                            onKeyDown={(e)=>handlekeys(e,inputRefs[index],inputRefs[index + 1],inputRefs[index-1])}
                            style={{
                                border:'1px solid black',
                                borderRadius:'8px',
                                padding:'6px',
                                fontSize:'20px'
                            }}
                            className=' aspect-square w-14 text-center'
                        />
                    ))}
                </div>
                <Button variant="contained" className='input_wallet_button relative left-16' type='submit'  endIcon={<SendIcon />}>
                    Send
                </Button>
            </form>
        </div>
    );
}

export default Pass_code;
