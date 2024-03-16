import React, { useContext, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import ContinueConform from '../Wallet/Continue_Conform';
import PassCode from '../Wallet/Pass_code';

import axios from 'axios';
import { MyContext } from '../../assets/Contextfile';
import TypeComp from './TypeComp';
import AmountInputDiv from './AmountInputDiv';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Bankdata from '../../assets/Bank.json'
import { nanoid } from '@reduxjs/toolkit';
import AuthContext from '../../assets/AuthContext';


//input box type
const input_Bank = [

  { name: 'Account_holder', type: 'text', label: "Account_name", id: 2 },
  { name: 'Account_number', type: 'numeric', label: "Account_Number", id: 3 },
  { name: 'load_amount', type: 'number', label: 'Amount' },
  { name: 'remarks', type: 'text', label: 'Remark' },
];

const Fund = () => {

  const [selectedBank, setselectedBank] = useState(0 || null); //Bank select
  const [transection, settransection] = useState([]); //after completing paid
  const [clickedsubmitted, setclickedsubmitted] = useState(false); //submitted or not
  const [checkedamount, setcheckedamount] = useState(false); //amount checked after submitting
  const [showpasscode, setshowpasscode] = useState(false); //pass_code visible
  const [readonly, setreadonly] = useState(false); //read mode
  const [selectedOptionValue, setselectedOptionValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [sucessMeg, setsucessMeg] = useState('')
  const [sendTranjection, setsendTranjection] = useState(false)

  //Bank details
  const BanksDetails = [
    { imgs: '/global.png', label: 'Same Bank', id: 1 },
    { imgs: '/connectIps.png', label: 'Connect Ips', id: 2 },
    { imgs: '/Khalti.png', label: 'Cross-bank', id: 3 },
  ];
  // const BanksDetails = Object.values(BanksData);

  const initialValues = {
    Account_holder: '',
    Account_number: '',
    load_amount: '',
    remarks: '',
    input_pin1: '',
    input_pin2: '',
    input_pin3: '',
    input_pin4: '',
  };

  const validationSchema = Yup.object({
    Account_number: Yup.number().required('Required').min(970000, "Required valid Id"),
    Account_holder: Yup.string().required('Required'),
    load_amount: Yup.number().required("Required").min(2, 'Amount must be above 10'),
    remarks: Yup.string().required('Required'),
    input_pin1: Yup.number().required("required"),
    input_pin2: Yup.number().required("required"),
    input_pin3: Yup.number().required("required"),
    input_pin4: Yup.number().required("required")
  });


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (value, { resetForm }) => {
      
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        const transaction_pin = parseInt(value.input_pin1 + value.input_pin2 + value.input_pin3 + value.input_pin4)
        const receiver_account_number = value.Account_number
        const receiver_name = value.Account_holder
        const amount = value.load_amount
        const remarks = value.remarks
        const access_token = AuthsendingToken.token;


        console.log('Bank', { transaction_pin, receiver_account_number, receiver_name, remarks, amount, access_token,sender:user?.user })

        const response = await axios.post('http://192.168.1.77:8000/api/balance-transfer',
          {
            'transaction_pin': transaction_pin,
            'receiver_account_number': receiver_account_number,
            'receiver_name': receiver_name,
            'remarks': remarks,
            'amount': amount,
            credentials: "include"
            // sender:user?.user?.id,
            // access_token
          },
          {
            headers
          },
         {
          mode: "cors",
          cache: "default",
         }
          )

        if (response.ok) {
          setsucessMeg(response.data.message)
          console.log(response.data.message)

        }


      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          // Set form errors based on server response
          setErrorMessage(error.response.data.errors);
        } else {
          // Set a general error message if no specific validation errors are provided
          setErrorMessage('An error occurred while processing your request. Please try again later.');
        }
      } finally {
        resetForm()
        restformTotal()
      }
    },
  });


  //amount check
 


  const { user } = useContext(MyContext)
  const AuthsendingToken = useContext(AuthContext)
  //continue for submit
  const handleButtonTrack = () => {
   
     if(sending_amount >9){
      const validAmount = sending_amount <= sender_account_Amount;
      setcheckedamount(validAmount);
      if (validAmount) {
        setclickedsubmitted(true);
      } else {
        setcheckedamount(false)
        setclickedsubmitted(false);
      } 
      if (checkedamount && clickedsubmitted) {
        restreadmode()
        const new_transectiondata = {
          selected_label: selectedOptionValue,
          username: formik.values.Account_holder,
          amount: sending_amount,
          account_receiver,
          remarks: formik.values.remarks,
          sender_house: user?.user?.account_number,
          receiver_house: 'Bank_name',
          sending_amount_label: 'Amount',
          receiver_account: 'To',
          sender_account: 'From',
          remarks_A: 'Remarks',
          User_label: 'Account_holder'
        };
  
        settransection([new_transectiondata]);
        setsendTranjection(true)
      }
     }
 

  };


  //handleShowPass_code
  const handlePasscode = () => {
    setshowpasscode(!showpasscode);
  }

  const restreadmode = () => {
    setreadonly(!readonly)
  }

  //reset mode
  const restformTotal = () => {
    settransection([]);
    setclickedsubmitted(false);
    setcheckedamount(false);
    setshowpasscode(false);
    setreadonly(false);
    setselectedBank(null)
  }

  //Bank select
  const HandleBankSelection = (BankId) => {
    setselectedBank(BankId);
  };

  // Bankchange Depending on selected bank
  const handleBankChange = (e) => {

    const selectedBankname = (e.target.value);
    setselectedOptionValue(selectedBankname)
    if (selectedBankname === 'Global Ime Bank Limited') {
      const bankdata = BanksDetails.find(bank => bank.id === 1)
      setselectedBank(bankdata.id)
      // setselectedOptionValue(e.target.value)
    }
  };

  //bank balance

  const sender_account_Amount = user?.user?.account_balance;
  // const sender_account_Amount = 
  const account_receiver= formik.values.Account_number
  //which Bank select
  const selected_label_method = BanksDetails.find((Bank) => Bank.id === selectedBank)?.label;
  //amount
  const sending_amount = formik.values.load_amount;
  // bankid name
  const bankname = Bankdata.find(bank => bank.id === 11)
  const userid=user?.user?.id


  return (
    <>
      <form onSubmit={(e) => {
        
        formik.handleSubmit(e);
      }}>
        {!showpasscode && (
          <div className="Bank-container box-design flex flex-row h-lvh">

            <div className="Bank-left-container  w-3/5 mx-10">
              <h1 className='text-center font-bold text-xl'>Fund Transfer</h1>

              <TypeComp MethodDetails={BanksDetails}
                selectedMethod={selectedBank}
                readonly={readonly}
                HandleMethodSelection={HandleBankSelection}
              />

              <hr className=' m-3' />

              <div className="selectbank_div flex flex-col gap-3 text-xl ml-3 box-design" style={{ width: 'inherit' }}>
                <label htmlFor='selected' className=' p-3  text-2xl font-medium underline  ' style={{ textDecorationThickness: '2px' }}>{selectedBank ? selected_label_method : 'Choose Bank'} </label>
                <select value={selectedOptionValue} name='selected' onChange={handleBankChange} className=' p-3 border '>
                  {
                    Bankdata.map((bank) => (
                      <option
                        value={selectedBank && selectedBank === 1 ? bankname.name : (bank.name)}
                        key={nanoid()}

                      >{selectedBank && selectedBank === 1 ? bankname.name : (bank.name)}
                      </option>

                    ))
                  }
                </select>
              </div>

              <AmountInputDiv
                selectedMethod={selectedBank}
                input_Method={input_Bank}
                handleButtonTrack={handleButtonTrack}
                Method_label={selected_label_method}
                readonly={readonly}
                formik={formik}
              />
            </div>
           
           
              <div className="Bank-right-container h-8vh mt-5">
              {checkedamount && clickedsubmitted && sendTranjection && ( 
 <ContinueConform tranjection={transection} onContinue={handlePasscode} OnreadMode={restreadmode} />
              )}
              </div>
           
            {!checkedamount && clickedsubmitted && <p>Please</p>}
          </div>
        )}
        {showpasscode && (
          <div className='flex justify-center items-center flex-col gap-3 h-80vh w-4/5 mx-auto my-4 z-index-top box-design'>

            <PassCode onClose={handlePasscode} formik={formik} />

            <Button variant="contained" className='input_Bank_button ' type='submit' color='success' endIcon={<SendIcon />}>
              Send
            </Button>

          </div>
        )}
        {
          errorMessage &&(
            <h1>{errorMessage} </h1>
          )
        }
        {
          sucessMeg &&(
            <h1>{sucessMeg} </h1>
          )
        }

      </form >
    </>
  );
};

export default Fund;
