import { faChartLine, faWallet, faArrowRightArrowLeft, faCreditCard, faPeopleRoof, faBook, faBars } from '@fortawesome/free-solid-svg-icons';


// 1. ActivationForm
export const inputBoxDetails = [
    { name: 'name', type: 'text', placeholder: '', label: 'Account-Holder Name' },
    { name: 'email', type: 'email', placeholder: '', label: 'Email' },
    { name: 'account_number', type: 'text', placeholder: '', label: 'Account_No' },
    { name: 'phone_number', type: 'tel', placeholder: '', label: 'Contact_no' },
]

export const inputPassword = [
    { name: 'password', type: 'password', placeholder: '', label: 'password' },
    { name: 'conform_password', type: 'password', placeholder: '', label: 'confirm_password' },
    { name: 'transaction_pin', type: 'password', placeholder: '', label: 'Transaction Pin' },
    { name: 'conform_transaction_pin', type: 'password', placeholder: '', label: 'Confirm Transaction Pin' },
]

// 2.Bank Fund-trnsfer
 //Bank details
export const BanksDetails = [
  { imgs: '/global.png', label: 'Same Bank', id: 1 },
  { imgs: '/connectIps.png', label: 'Connect Ips', id: 2 },
  { imgs: '/Khalti.png', label: 'Cross-bank', id: 3 },
];

//input box type
export const input_Bank = [

    { name: 'Account_holder', type: 'text', label: "Account_name", id: 2 },
    { name: 'Account_number', type: 'numeric', label: "Account_Number", id: 3 },
    { name: 'load_amount', type: 'number', label: 'Amount' },
    { name: 'remarks', type: 'text', label: 'Remark' },
];

// 3.Nav

export   const navlinkpath = [
    { to: 'dash', icon: faChartLine, label: 'Dash-Board' },
    { to: 'Wallets', icon: faWallet, label: 'Wallets' },
    { to: 'transfer', icon: faArrowRightArrowLeft, label: 'Fund transfer' },
    // { to: 'card', icon: faCreditCard, label: 'Card' },
    // { to: '#', icon: faPeopleRoof, label: 'Cooprate Management' },
    { to: 'history', icon: faBook, label: 'Payments' },
    { to: 'Recived', icon: faBook, label: 'Received Funds' },
    // { to: '/', icon: faBars, label: 'QR' },
]