import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './assets/Layout';
import ActivationLogin from './loginA/ActivationLogin/ActivationLogin';
import Forgotten from './loginA/forgottenpassword/Forgotten';
import Login from './loginA/login/Login';
import Dashboard from './componets/Dash_board/Dashbord';
import Wallets from './componets/Wallet/Wallets';
import Fund from './componets/Fundtransfer/Fund';
import PageNotFound from './assets/PageNotFound';
import Historyfile from './componets/HistoryFile/Historyfile';


const router = createBrowserRouter([
  {
    path: 'activationlogin',
    element: <ActivationLogin />,
  },
  {
    path: 'forgotten',
    element: <Forgotten />,
  },
  {
    path: '/',
    element: <Login />,
  },
  
  {
    path: '*',
    element:<Login /> ,
  },
  {
    path: '/',
    element: <Layout />,
    
    children: [
      {
        path: 'dashboard',
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
        element: <Historyfile/>,
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
