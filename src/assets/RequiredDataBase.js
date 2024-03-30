import { faChartLine, faWallet, faArrowRightArrowLeft, faCreditCard, faPeopleRoof, faBook, faBars } from '@fortawesome/free-solid-svg-icons';


// 1. ActivationForm
export const inputBoxDetails = [
    { name: 'name', type: 'text', placeholder: 'Enter your name', label: 'Account-Holder Name' },
    { name: 'email', type: 'email', placeholder: 'Enter your email', label: 'Email' },
    { name: 'account_number', type: 'text', placeholder: 'Enter your Account no', label: 'Account_No' },
    { name: 'phone_number', type: 'tel', placeholder: 'Enter your Number', label: 'Contact_no' },
]

export const inputPassword = [
    { name: 'password', type: 'password', placeholder: 'Enter your password', label: 'password' },
    { name: 'conform_password', type: 'password', placeholder: 'Enter your conform_password', label: 'conform_password' },
    { name: 'transaction_pin', type: 'password', placeholder: 'Enter your pass', label: 'P password' },
    { name: 'conform_transaction_pin', type: 'password', placeholder: 'Enter your P conform_password', label: 'P conform_password' },
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
    { to: 'dashboard', icon: faChartLine, label: 'Dash-Board' },
    { to: 'Wallets', icon: faWallet, label: 'Wallets' },
    { to: 'transfer', icon: faArrowRightArrowLeft, label: 'Fund transfer' },
    { to: 'card', icon: faCreditCard, label: 'Card' },
    { to: '/', icon: faPeopleRoof, label: 'Cooprate Management' },
    { to: 'history', icon: faBook, label: 'History' },
    { to: '/', icon: faBars, label: 'QR' },
]