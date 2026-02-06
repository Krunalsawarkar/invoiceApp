import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import LandingPage from "./pages/LandingPage/LandingPage"
import Signup from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'
import Dashboard from "./pages/Dashboard/Dashboard" 
import AllInvoice from './pages/Invoices/AIllnvoice'
import CreateInvoice from './pages/Invoices/CreateInvoice'
import InvoiceDetails from './pages/Invoices/InvoiceDetails'
import ProtectedRoute from './components/auth/ProtectedRoute'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<LandingPage/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />

          {/* Protected Routes */}
          <Route path='/' element={<ProtectedRoute/>}>
            <Route path='dashboard' element={<Dashboard/>} /> 
            <Route path='invoices' element={<AllInvoice/>} /> 
            <Route path='invoices/new' element={<CreateInvoice/>} /> 
            <Route path='invoices/:id' element={<InvoiceDetails/>} /> 
          </Route>


          {/* Catch All Routes */}
          <Route path='*' element={<Navigate to="/" replace/>} />

        </Routes>
      </BrowserRouter>

      <Toaster toastOption={{
        className : "",
        style:{
          fontSize:"13px"
        }
      }} />
    </div>
  )
}

export default App