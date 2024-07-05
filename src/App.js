import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './assets/Layout';

import Forgotten from './loginA/forgottenpassword/Forgotten';
import Login from './loginA/login/Login';
import Dashboard from './componets/Dash_board/Dashbord';
import Wallets from './componets/Wallet/Wallets';
import Fund from './componets/Fundtransfer/Fund';

import HistoryTable from './componets/HistoryFile/HistoryTable';
import Cardfile from './componets/Card/Cardfile';


import ParentsActivation from './loginA/ActivationLogin/ParentsActivation';
import ApplyCard from './componets/Card/ApplyCard';
import StateCard from './componets/Card/StateCard';
import Ottp from './loginA/ActivationLogin/Ottp';
import SuccessMessage from './assets/SuccessMsg';
import PageNotFound from './assets/PageNotFound';
import ReceivedTable from './componets/HistoryFile/ReceivedTable';

const router = createBrowserRouter([ 
  {
    path: 'activationlogin',
      element: <ParentsActivation/>,
  }
,
  {
    path: 'successMsg',
      element: <SuccessMessage/>,
  }
,
  {
    path: 'ottp',
      element: <Ottp/>,
  }
,
  {
    path: 'forgotten',
    element: <Forgotten />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  
  {
    path: '*',
    element:<PageNotFound /> ,
  },
  {
    path: '/',
    element: <Layout />,
    
    children: [
      {
        path: 'dash',
        element: <Dashboard />,
      },
      {
        path: 'wallets',
        element: <Wallets />,
      },
      {
        path: 'transfer',
        element: <Fund/>,
      },
      {
        path: 'history',
        element: <HistoryTable/>,
      },
      {
        path: 'Recived',
        element: <ReceivedTable/>,
      },
      {
        path: 'card',
        element: <Cardfile/>,
        children:[
        {
          path:'applycard',
          element:<ApplyCard/>
        },
        {
          path:'statecard',
          element:<StateCard/>
        },

        ]
      },
     
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}/>    
      
    </main>
  );
}

export default App;
