import logo from './logo.svg';
import './App.css';
import Header from './Component/Headers/Header';
import AuthForm from './Component/Authentication/Authform';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Welcomepage from './Component/Welcome/Welcomepage';
import { useContext } from 'react';
import Context from './Store/auth-ctx';
import UpdateProfile from './Component/UpdateProfile/UpdateProfile';
import VerifyEmail from './Component/VerifyEmail/VerifyEmail';
import ForgotPassword from './Component/Authentication/ForgotPassword';
import Expense from './Component/Expense/Expenses';

function App() {

  const ctx =useContext(Context);
 const navigate =  useNavigate()
  

  return (
   <div>
    
    <Header/>
    <Routes>
      <Route path='/login' element={!ctx.isLoging ?<AuthForm/> : <Welcomepage/>} />
      
      <Route path='/' element={ctx.isLoging ?<Welcomepage/> : <AuthForm/>} />
    
      <Route path='/updateprofile' element={ctx.isLoging ?<UpdateProfile/> : <AuthForm/>}  />
      <Route path='/updateprofile/verifyemail' element={ctx.isLoging ?<VerifyEmail/> : <AuthForm/>}  />
      <Route path='*' element={!ctx.isLoging ?<AuthForm/> : <Welcomepage/>}  />
      <Route path="/login/forgot password" element={<ForgotPassword/>} />
      {/* <Route path='/welcome' element={<Welcomepage/>} /> */}
     

    </Routes>
   </div>
  );
}

export default App;
