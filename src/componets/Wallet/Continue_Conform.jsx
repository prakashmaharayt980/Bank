import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


const Continue_Conform = ({ tranjection, button_tracked, resetformDataFormchild }) => {
    const [visibleDiv, setvisibleDiv] = useState(false);
    const [btn_tracked, setbtn_tracked] = useState(false)

    const handlecancel = () => {
        setvisibleDiv(false);
        resetformDataFormchild(); // Call the resetformDataFormchild function provided by the parent
    };

    useEffect(() => {
        if (button_tracked !== undefined) {
            setvisibleDiv(!button_tracked);
        }
    }, [button_tracked]);

    const hnadleContinue =()=>{
        setbtn_tracked(true)
        setvisibleDiv(!visibleDiv)

    }

    return (
        <>
            {visibleDiv && (
                <div className='box-design' style={{ width: '340px' }}>
                    <form method="post">
                        <h1 className='text-center head-style-h1'>Confirm Your Transaction</h1>
                        {tranjection.map((transaction) => (
                            <div key={uuidv4()} className='transaction-item my-2'>
                                <div className='transaction-details flex items-center flex-col justify-between'>
                                    <p>{transaction.receiver_house} : {transaction.wallet_label} </p>
                                    <p>{transaction.sending_amount} : {transaction.amount} </p>
                                    <p>{transaction.receiver_account} : {transaction.account_receiver} </p>
                                    <p>{transaction.sender_account} : {transaction.sender_house} </p>
                                    <p>{transaction.remarks_A} : {transaction.remarks} </p>
                                </div>
                                <div className="button flex gap-2 justify-evenly m-2">
                                    <Button variant="contained" className='input_wallet_button' type='submit' onClick={hnadleContinue} endIcon={<SendIcon />}>
                                        Continue
                                    </Button>
                                    <Button variant="contained" className='input_wallet_button-cancel' type='button' onClick={handlecancel} endIcon={<SendIcon />}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>          
                        ))}
                    </form>
                </div>
            )}
            {
                
            }
        </>
    );
};

export default Continue_Conform;
