import { createBrowserRouter, Outlet } from 'react-router-dom';
// Pages
import Login from '@pages/Login';
import Dashboard from '@pages/Dashboard';
import Profile from '@pages/Profile';
import Register from '@pages/Register';
// Components
import E401 from '@pages/E401';
import E404 from '@pages/E404';
import E500 from '@pages/E500';
import PrivateRoute from '@components/PrivateRoute';
import PublicRoute from '@components/PublicRoute';
import OrderListingPage from '@pages/OrderListingPage';



const ErrorRoute = () => {
  return (
    <>
      <div id="layoutError">
        <div id="layoutError_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center mt-4">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        handle: { title: 'Dashboard', breadcrumb: 'Dashboard' }, // Dados personalizados
      },
      {
        path: '/profile',
        element: <Profile />,
        handle: { title: 'Profile', breadcrumb: 'Profile' }
        },
        {
            path: '/orders',
            element: <OrderListingPage />,
        },

    ],
  },
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '/',
    element: <ErrorRoute />,
    children: [
      { path: '*', element: <E404 /> },
      { path: '/e401', element: <E401 /> },
      { path: '/e500', element: <E500 /> },

    ],
  },
]);

export default router;