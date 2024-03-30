import * as Yup from 'yup';

//1. validation of ActivationAccount
export const initialValues = {
    name: '',
    email: '',
    password: '',
    account_number: '',
    phone_number: '',
    conform_password: '',
    transaction_pin: '',
    conform_transaction_pin: ''
}

export  const validateform = Yup.object().shape({
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

//2. validation of Fund-transfer
export const initialValuesFund = {
    Account_holder: '',
    Account_number: '',
    load_amount: '',
    remarks: '',
    input_pin1: '',
    input_pin2: '',
    input_pin3: '',
    input_pin4: '',
  };

export const validationSchemaFund = Yup.object({
    Account_number: Yup.number().required('Required').min(970000, "Required valid Id"),
    Account_holder: Yup.string().required('Required'),
    load_amount: Yup.number().required("Required").min(2, 'Amount must be above 10'),
    remarks: Yup.string().required('Required'),
    input_pin1: Yup.number().required("required"),
    input_pin2: Yup.number().required("required"),
    input_pin3: Yup.number().required("required"),
    input_pin4: Yup.number().required("required")
  });

//3.   login


export const initialValuesLogin= {
    email: '',
    password: ''
}
  export const validationSchemaLogin = Yup.object({
    email: Yup.string().test(
        'is-email-or-phone',
        'Please enter a valid email address or phone number',
        function (value) {
            if (!value) return true; 
            if (value.includes('@')) {
                return Yup.string().email().isValidSync(value);
            }
            
            return Yup.string().matches(/^[0-9]+$/, 'Phone number must be numeric').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be at most 15 digits').isValidSync(value);
        }
    ).required('enter'),
    password: Yup.string().required("Please enter your password")
});

// 4.Ottp
export const initialValuesOttp = {
    input_Ottp1: '',
    input_Ottp2: '',
    input_Ottp3: '',
    input_Ottp4: '',
}

export const validationSchemaOttp = Yup.object({
    input_Ottp1: Yup.number().required(),
    input_Ottp2: Yup.number().required(),
    input_Ottp3: Yup.number().required(),
    input_Ottp4: Yup.number().required(),
})

