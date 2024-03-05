import React, { useState } from 'react';
import { TextField, Button, FormControl } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Continue_Conform from './Continue_Conform';
import { useEffect } from 'react';
import Pass_code from './Pass_code';

const WalletsDetails = [
    { imgs: './esewa.png', label: 'Esewa', id: 1 },
    { imgs: './Imepay.png', label: 'ImePay', id: 2 },
    { imgs: './Khalti.png', label: 'Khalti', id: 3 },
];

const input_Wallet = [
    { name: 'wallet_id', type: 'numeric', label: "Number", id: 1 },
    { name: 'load_amount', type: 'number', label: 'Amount' },
    { name: 'remarks', type: 'text', label: 'Remark' },
];

const Wallets = () => {
    const [selectedWallet, setselectedWallet] = useState(null);
    const [transection, settransection] = useState([]);
    const [clickedsubmitted, setclickedsubmitted] = useState(false);
    const [checkedamount, setcheckedamount] = useState(false);
    const [button_track, setbutton_track] = useState(false);
    const [readonly, setreadonly] = useState(false);

    const handleButtonTrack = () => {
        if (clickedsubmitted) {
            setreadonly(!readonly);
        }

        setbutton_track(!button_track);
    };

    const resetform = () => {
        settransection([]);
        setclickedsubmitted(false);
        setreadonly(false);
    };

    const sender_account_Amount = 1000;

    const HandleWalletSelection = (walletId) => {
        setselectedWallet(walletId);
    };

    const wallet_label = WalletsDetails.find((wallet) => wallet.id == selectedWallet)?.label;

    const initialValues = {
        wallet_id: '',
        load_amount: '',
        remarks: ''
    };

    const validationSchema = Yup.object({
        wallet_id: Yup.number().required('Required').min(980000000, "Required valid Id"),
        load_amount: Yup.number().required("Required").min(2, 'amount must be above 10'),
        remarks: Yup.string().required('Required')
    });

    const { handleBlur, handleSubmit, handleChange, touched, errors, values } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (value) => {
            const new_transectiondata = {
                wallet_label,
                amount: values.load_amount,
                account_receiver: values.wallet_id,
                remarks: values.remarks,
                sender_house: 123456789,
                receiver_house: 'Wallet_name',
                sending_amount: 'Amount',
                receiver_account: 'To',
                sender_account: 'From',
                remarks_A: 'Remarks'
            };

            settransection([new_transectiondata]);
            setclickedsubmitted(true);
            amountChecked();
            // resetForm()
        }
    });

    const sending_amount = values.load_amount;

    const amountChecked = () => {
        if (sending_amount <= sender_account_Amount) {
            return setcheckedamount(true);
        } else {
            return setcheckedamount(false);
        }
    };

    return (
        <>
            <div className="wallet-contanor box-design  flex flex-row h-lvh">
                <form method="post" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                    <div className="wallest-left-contanor  w-2/5 mx-10">
                        <h1 className=' text-center font-bold text-xl' >Wallets</h1>
                        <div className="chosoe-wallet-contanor box-design text-center flex flex-col justify-center w-fit">
                            <h1 >Choose One</h1>
                            <div className="flex ">
                                {WalletsDetails.map((walletD, index) => (
                                    <div className={`wallet-box  box-design flex flex-col items-center justify-center m-3
                                     ${selectedWallet === walletD.id ? "selectedCss_Wallet" : ''}`}
                                        style={{ fontSize: '20px', width: '200px' }} key={walletD.id}
                                        onClick={() => HandleWalletSelection(walletD.id)}>
                                        <input type="radio"
                                            id={`wallet-${walletD.id}`}
                                            name='wallet'
                                            disabled={readonly}
                                            value={walletD.id}
                                            checked={selectedWallet === walletD.id}
                                            onChange={() => HandleWalletSelection(walletD.id)}
                                            className='wallet-radio-btn  relative left-16 top-3 w-5 aspect-square ' />
                                        <label htmlFor={walletD.label} className={`wallet-label`} >
                                            <img src={walletD.imgs} name={walletD.label} alt="wallet-img" width='45px' />{walletD.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr className=' m-1' />
                        <div className="wallet-input-box mt-2 flex flex-col items-center justify-center mx-3 ">
                            {selectedWallet &&
                                input_Wallet.map((input_W, index) => (
                                    <FormControl fullWidth key={index} sx={{ m: 1 }} style={{ marginLeft: '10px' }}>
                                        <TextField
                                            value={values[input_W.name]}
                                            name={input_W.name}
                                            type={input_W.type}
                                            label={input_W.id == 1 ? `${wallet_label} ${input_W.label}` : input_W.label}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={readonly}
                                            touched={touched[input_W.name] ? "true" : "false"}
                                            error={errors[input_W.name] && touched[input_W.name]}

                                            variant="outlined" />
                                    </FormControl>
                                ))}
                            {selectedWallet &&
                                <Button variant="contained" onClick={handleButtonTrack} className='input_wallet_button' type='submit' endIcon={<SendIcon />}>
                                    Continue
                                </Button>
                            }
                        </div>
                    </div>
                </form>


                {checkedamount && clickedsubmitted && <div className="wallet-Right-contanor h-8vh mt-5">
                    <Continue_Conform tranjection={transection} button_tracked={button_track} resetformDataFormchild={resetform} />
                </div>}
                {!checkedamount && clickedsubmitted && <p>Please</p>}
                                  
            </div>
           
        </>
    );
};

export default Wallets;
