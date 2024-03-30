import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import ContinueConform from '../Wallet/ContinueConform';
import PassCode from '../Wallet/Passcode';
import axios from 'axios';
import { MyContext } from '../../assets/Contextfile';
import TypeComp from './TypeComp';
import AmountInputDiv from './AmountInputDiv';
import { nanoid } from '@reduxjs/toolkit';
import {urlFundTransfer} from '../../assets/RequiredUrlOfBackend'
import {BanksDetails,input_Bank} from '../../assets/RequiredDataBase'
import {initialValuesFund,validationSchemaFund} from '../../assets/RequiredValidationFormik'
import Loadingdiv from '../../loginA/Loading/Loadingdiv'


const Fund = () => {

  const [selectedBank, setselectedBank] = useState(0 || null); //Bank select
  const [transection, settransection] = useState([]); //after completing paid
  const [clickedsubmitted, setclickedsubmitted] = useState(false); //submitted or not
  const [checkedamount, setcheckedamount] = useState(false); //amount checked after submitting
  const [showpasscode, setshowpasscode] = useState(false); //Passcode visible
  const [readonly, setreadonly] = useState(false); //read mode
  const [selectedOptionValue, setselectedOptionValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [sucessMeg, setsucessMeg] = useState('')
  const [sendTranjection, setsendTranjection] = useState(false)
  const [isloading, setisloading] = useState(false)

  const formik = useFormik({
    initialValues:initialValuesFund,
    validationSchema:validationSchemaFund,
    onSubmit: async (value, { resetForm }) => {

      try {       
          setisloading(true)
        const response = await axios.post(urlFundTransfer,
          {
            transaction_pin:parseInt(value.input_pin1 + value.input_pin2 + value.input_pin3 + value.input_pin4),
            receiver_account_number:value.Account_number,
            receiver_name: value.Account_holder,
            remarks:value.remarks,
            amount:value.load_amount,
            credentials: "include"
          
          },
          {
           Authorization: `Token ${localStorage.getItem('token')}`
          //  Authorization: `Token ${user.access_token}`
          },
          {
            mode: "cors",
            cache: "default",
          }
        )

        if (response===200) {
          setsucessMeg(response.data.message)
         setTimeout(() => {
          setisloading(false)
         }, 2000);

        }
        if (!response===200) {
          errorMessage(response.data.message)
          console.log(response.data.message)

        }


      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        resetForm()
        restformTotal()
        setTimeout(() => {
          setisloading(false)
         }, 2000);
      }
    },
  });
  //amount check
  const { user,BankData } = useContext(MyContext)

  //continue for submit
  const handleButtonTrack = () => {

    if (sending_amount > 9) {
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


  //handleShowPasscode
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

  const sender_account_Amount = 1000   //user?.user?.account_balance ;
  // const sender_account_Amount = 
  const account_receiver = formik.values.Account_number
  //which Bank select
  const selected_label_method = BanksDetails.find((Bank) => Bank.id === selectedBank)?.label;
  //amount
  const sending_amount = formik.values.load_amount;
  // bankid name
  const bankname = BankData.find(bank => bank.id === 11)



  return (
    <>
     {
      isloading ?(<Loadingdiv/> ): (
        <form onSubmit={(e) => {

          formik.handleSubmit(e);
        }}>
          {!showpasscode && (
            <div className="Bank-container box-design flex flex-row h-90vh m-3">
  
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
                      BankData.map((bank) => (
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
  
              {!checkedamount && clickedsubmitted && <p>Please check Your Amount</p>}
            </div>
          )}
          {showpasscode && (
            <div className='flex justify-center items-center flex-col gap-3 h-80vh w-4/5 mx-auto my-4 z-index-top box-design'>
              <PassCode onClose={handlePasscode} errorMessage={errorMessage} sucessMeg={sucessMeg} formik={formik} />
            </div>
          )}
  
  
        </form >
      )
     }
    </>
  );
};

export default Fund;
