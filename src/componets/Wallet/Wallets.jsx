import React, { useContext, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Continue_Conform from './Continue_Conform';
import Pass_code from './Pass_code';
import axios from 'axios';
import { MyContext } from '../../assets/Contextfile';
import TypeComp from '../Fundtransfer/TypeComp';
import AmountInputDiv from '../Fundtransfer/AmountInputDiv';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';





//input box type
const input_Wallet = [
    { name: 'wallet_id', type: 'numeric', label: "Number", id: 1 },
    { name: 'load_amount', type: 'number', label: 'Amount' },
    { name: 'remarks', type: 'text', label: 'Remark' },
];

const Wallets = () => {
    const [selectedWallet, setselectedWallet] = useState(null); //wallet select
    const [transection, settransection] = useState([]); //after completing paid
    const [clickedsubmitted, setclickedsubmitted] = useState(false); //submitted or not
    const [checkedamount, setcheckedamount] = useState(false); //amount checked after submitting
    const [showpasscode, setshowpasscode] = useState(false); //pass_code visible
    const [readonly, setreadonly] = useState(false); //read mode

    //wallet details
    const WalletsDetails = [
        { imgs: '/esewa.png', label: 'Esewa', id: 1 },
        { imgs: '/Imepay.png', label: 'ImePay', id: 2 },
        { imgs: '/Khalti.png', label: 'Khalti', id: 3 },
    ];
    // const WalletsDetails = Object.values(walletsData);


    //bank balance
    // TODO:user.user.account_balance
    const sender_account_Amount = 100000;
    //amount check
    const amountChecked = () => {
        const validAmount = sending_amount <= sender_account_Amount;
        setcheckedamount(validAmount);
        if (validAmount) {
            setclickedsubmitted(true);
        } else {
            setclickedsubmitted(false);
        }
    };;

    //  TODO:  const{user}= useContext(MyContext)
    //continue for submit
    const handleButtonTrack = () => {
        amountChecked();
        console.log('cli', clickedsubmitted);
        console.log('am', checkedamount);
       

        if (checkedamount && clickedsubmitted) {

           
            restreadmode()
            const new_transectiondata = {
                selected_label,
                amount: formik.values.load_amount,
                account_receiver: formik.values.wallet_id,
                remarks: formik.values.remarks,
                sender_house: 123456789,//TODO:user.user.account_number
                receiver_house: 'Wallet_name',
                sending_amount: 'Amount',
                receiver_account: 'To',
                sender_account: 'From',
                remarks_A: 'Remarks'
            };

            settransection([new_transectiondata]);
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
        setselectedWallet(null)
    }




    //wallet select
    const HandleWalletSelection = (walletId) => {
        setselectedWallet(walletId);
    };

    //which wallet select
    const selected_label = WalletsDetails.find((wallet) => wallet.id === selectedWallet)?.label;


    const initialValues = {
        wallet_id: '',
        load_amount: '',
        remarks: '',
        input_pin1: '',
        input_pin2: '',
        input_pin3: '',
        input_pin4: '',
    };

    const validationSchema = Yup.object({
        wallet_id: Yup.number().required('Required').min(970000000, "Required valid Id"),
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
                const entervalues = parseInt(value.input_pin1 + value.input_pin2 + value.input_pin3 + value.input_pin4)
                console.log('wallet', { entervalues, selected_label, ...value })
                resetForm()
                restformTotal()

            } catch (error) {

            }


        },

    });

    //amount
    const sending_amount = formik.values.load_amount;




    return (
        <>
            <form method="post" onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
            }}>
                {!showpasscode && (
                    <div className="wallet-container box-design flex flex-row h-lvh">

                        <div className="wallet-left-container  w-3/5 mx-10">
                            <h1 className='text-center font-bold text-xl'>Wallets</h1>

                            <TypeComp MethodDetails={WalletsDetails}
                                selectedMethod={selectedWallet}
                                readonly={readonly}
                                HandleMethodSelection={HandleWalletSelection}
                            />
                            <hr className=' m-3' />
                            <AmountInputDiv
                                selectedMethod={selectedWallet}
                                input_Method={input_Wallet}
                                handleButtonTrack={handleButtonTrack}
                                Method_label={selected_label}
                                readonly={readonly}
                                formik={formik}
                            />
                        </div>

                        {checkedamount && clickedsubmitted && (
                            <div className="wallet-right-container h-8vh mt-5">
                                <Continue_Conform tranjection={transection} onContinue={handlePasscode} OnreadMode={restreadmode} />
                            </div>
                        )}
                        {!checkedamount && clickedsubmitted && <p>Please</p>}
                    </div>
                )}
                {showpasscode && (
                    <div className='flex justify-center items-center flex-col gap-3 h-80vh w-4/5 mx-auto my-4 z-index-top box-design'> 
                    
                     <Pass_code onClose={handlePasscode} formik={formik} />
                        
                            <Button variant="contained" className='input_wallet_button ' type='submit' color='success' endIcon={<SendIcon />}>
                                Send
                            </Button>

                    </div>
                )}
            </form >
        </>
    );
};

export default Wallets;
