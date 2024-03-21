import React ,{useState}from 'react';
import { useFormik } from 'formik';
import Inputbox from '../inputbox/inputbox';
import * as Yup from 'yup';
import Togglepassword from '../togglepassword/Togglepassword';
import '../ActivationLogin/Activation.css';
import { useNavigate } from 'react-router-dom';
import Loadingdiv from '../Loading/Loadingdiv';


const initialValues = {
    name: '',
    email: '',
    password: '',
    account_number: '',
    phone_number: '',
    conform_password: '',
    transaction_pin: '',
    conform_transaction_pin: ''
}

const validateform = Yup.object().shape({
    name: Yup.string().required('Enter your name'),
    email: Yup.string().email().required('Enter your email'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, "password must have lower-case char")
        .matches(/[A-Z]/, "password must have upper-case char")
        .matches(/[.`~!()-_@#$%^&*?]/, "password must have at least one special character")
        .matches(/\d/, 'Password must have at least one number')
        .required('Password is required'),
    conform_password: Yup.string().min(8, 'Password must be at least 8 characters').required('More characters needed')
        .oneOf([Yup.ref('password'), null], "Passwords must match"),

    transaction_pin: Yup.number().required('Transaction PIN is required'),
    conform_transaction_pin: Yup.number().required('More characters needed')
        .oneOf([Yup.ref('transaction_pin'), null], "PINs must match"),

    account_number: Yup.number()
        .typeError('Account must be a number')
        .required("Account number is required"),

    phone_number: Yup.number()
        .typeError('Account must be a number')
        .required("Contact number is required")
})

const ActivationLogin = () => {
    const [Isloading, setIsloading] = useState(true)
    const nagviation=useNavigate()

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateform,
        onSubmit: async (values, action) => {
            try {
                setIsloading(true)
                const response = await fetch('http://192.168.1.77:8000/api/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify(values)
                });

                // Assuming you want to handle the response here
               if(response.ok){
                const data = await response.json();
                console.log('re response:', data);
                nagviation('/')

               }

            } catch (error) {
                console.error('Error during login:', error);
            }finally{
                setIsloading(false)
            }

        }
    })

    const inputBoxDetails = [
        { name: 'name', type: 'text', placeholder: 'Enter your name', label: 'Account-Holder Name' },
        { name: 'email', type: 'email', placeholder: 'Enter your email', label: 'Email' },
        { name: 'account_number', type: 'text', placeholder: 'Enter your Account no', label: 'Account_No' },
        { name: 'phone_number', type: 'tel', placeholder: 'Enter your Number', label: 'Contact_no' },
    ]

    const inputPassword = [
        { name: 'password', type: 'password', placeholder: 'Enter your password', label: 'password' },
        { name: 'conform_password', type: 'password', placeholder: 'Enter your conform_password', label: 'conform_password' },
        { name: 'transaction_pin', type: 'password', placeholder: 'Enter your pass', label: 'P password' },
        { name: 'conform_transaction_pin', type: 'password', placeholder: 'Enter your P conform_password', label: 'P conform_password' },
    ]

    return (
        <>
         {
            Isloading ? (
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
              
            </div>
            ):<Loadingdiv/>
         }
               
        </>
    );
}

export default ActivationLogin;
