

import ActivationLogin from './loginA/ActivationLogin/ActivationLogin';
import Forgotten from './loginA/forgottenpassword/Forgotten';
import { createBrowserRouter,RouterProvider, } from 'react-router-dom';
import Login from './loginA/login/Login'
import Layout from './assets/Layout';
import Dashbord from './componets/Dash_board/Dashbord';
import Wallets from './componets/Wallet/Wallets';
import Pass_code from './componets/Wallet/Pass_code';

const router=createBrowserRouter([
  {
    path:'activationlogin',
    element:<ActivationLogin></ActivationLogin>
  },
    {
    path:'forgotten',
    element:<Forgotten></Forgotten>
  },
    {
    path:'login',
    element:<Login></Login>
  },
 {
  path:'/',
  element:<Layout/>,
  children:[
  
    {
      path:'',
      element:<Dashbord></Dashbord>
    },
    {
      path:'wallets',
      element:<Wallets></Wallets>
    },
    
    {
      path:'transfer',
      element:<Pass_code></Pass_code>
    },
    
  
  
  ]
 }

])

function App() {
  return (
   <main>
  <RouterProvider router={router}/>
   </main>
  );
}

export default App;
