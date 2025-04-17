import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import NotFound from './Shared/NotFound/NotFound'
import SignIn from './Auth/SignIn/SignIn'
import ForgetPassword from './Auth/ForgetPassword/ForgetPassword'
import MasterLayout from './Layouts/MasterLayout/MasterLayout'
import Dashboard from './Pages/Dashboard/Dashboard'
import Requests from './Pages/Requests/Requests'
import Clients from './Pages/Clients/Clients'
import CollapsibleTable from './Pages/Requests/Requests'
import Transactions from './Pages/Transactions/Transactions'
import Categories from './Pages/Categories/Categories'
import ProductsList from './Pages/ProductsList/ProductsList';
import AddOns from './Pages/AddOns/AddOns'
import Ratings from './Pages/Ratings/Ratings'
import AdminSettings from './Pages/AdminSettings/AdminSettings'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ValidateCode from './Pages/ValidateCode/ValidateCode'
import Roles from './Pages/Roles/Roles'
import AppSettings from './Pages/ContactUs/AppSettings'
import { Notification } from './Pages/Notification/Notification'
import Photos from './Pages/Photos/Photos'
import PaymentMethods from './Pages/PaymentMethods/PaymentMethods'
import AllProducts from './Pages/AllProducts/AllProducts'
import Variables from './Pages/Variables/Variables'
import ConnectPorducts from './Pages/ConnectProducts/ConnectProducts'
import ResetPassword from './Auth/ResetPassword/ResetPassword'
import Banners from './Pages/Photos/Banners'
import './i18n'


function App() {

  const route = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <SignIn /> },
        { path: 'sign-in', element: <SignIn /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ]
    },
    {
      path: '/',
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'requests', element: <CollapsibleTable /> },
        { path: 'clients', element: <Clients /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'categories', element: <Categories /> },
        { path: 'products-list', element: <ProductsList /> },
        { path: 'add-ons', element: <AddOns /> },
        { path: 'ratings', element: <Ratings /> },
        { path: 'admin-settings', element: <AdminSettings /> },
        { path: 'admin-settings/validate-code', element: <ValidateCode /> },
        { path: 'roles', element: <Roles /> },
        { path: 'contact-us', element: <AppSettings /> },
        { path: 'notifications', element: <Notification /> },
        { path: 'photos', element: <Photos /> },
        { path: 'payment', element: <PaymentMethods /> },
        { path: 'products', element: <AllProducts /> },
        { path: 'variables', element: <Variables /> },
        { path: 'connect-products', element: <ConnectPorducts /> },
        { path: 'banners', element: <Banners /> },
      ]
    },
  ])


  return (
    <>

      <>
        <ToastContainer />
        <RouterProvider router={route}>

        </RouterProvider>

      </>

    </>
  )
}

export default App
