import React, { useContext, useEffect } from 'react';
import { MyContext } from './Contextfile';

const SuccessMessage = () => {
  const {transactions}=useContext(MyContext)




  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-blue-100 border border-blue-400 text-blue-900 px-4 py-3 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-lg font-semibold">Success!</p>
        </div>
        <p className="mt-2">Amount Sent: ${transactions?.amount}</p>
        <p>Receiver: {transactions?.receiver_account_number}</p>
        <p>Date: {transactions?.timestamp}</p>
        <p>Status: {transactions?.status?'success':'failed'}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
