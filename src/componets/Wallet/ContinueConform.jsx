import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContinueConform = ({ tranjection, onContinue,OnreadMode }) => {
    const [visibleDiv, setVisibleDiv] = useState(false);

    const handleCancel = () => {
        OnreadMode()
        setVisibleDiv(false);
    };

    useEffect(() => {
        setVisibleDiv(true);
    }, [tranjection]);

    return (
        <>
            {visibleDiv && (
                <div className='box-design' style={{ width: '340px' }}>
                    
                        <h1 className='text-center head-style-h1'>Confirm Your Transaction</h1>
                        {tranjection.map((transaction) => (
                            <div key={`${transaction.remarks}+${tranjection.id}`} className='transaction-item my-2'>
                                <div className='transaction-details flex items-center flex-col justify-between'>
                                    <p>{transaction.receiver_house} : {transaction.selected_label} </p>
                                    <p>{transaction.User_label} : {transaction.username} </p>
                                    <p>{transaction.sending_amount_label} : {transaction.amount} </p>
                                    <p>{transaction.receiver_account} : {transaction.account_receiver} </p>
                                    <p>{transaction.sender_account} : {transaction.sender_house} </p>
                                    <p>{transaction.remarks_A} : {transaction.remarks} </p>
                                </div>
                                <div className="button flex gap-2 justify-evenly m-2">
                                    <Button variant="contained" className='input_wallet_button ' color='success' type='button' 
                                    onClick={onContinue} endIcon={<SendIcon />}>
                                        Continue
                                    </Button>
                                    <Button variant="contained" className='input_wallet_button-cancel' color='warning' type='button'
                                     onClick={handleCancel} endIcon={<SendIcon />}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ))}
                  
                </div>
            )}
        </>
    );
};

export default ContinueConform;
