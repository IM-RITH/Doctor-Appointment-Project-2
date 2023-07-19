import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Button} from 'antd';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import ProtectRoute from './components/ProtectRoute';
import PublicRoute from './components/PublicRoute';
import ApplyToDoctor from './pages/ApplyToDoctor';
import Notification from './pages/Notification';
import UserList from './pages/Admin/UserList';
import DoctorList from './pages/Admin/DoctorList';
import DoctorProfile from './pages/Doctor/Profile';
import Booking from './pages/Booking';
import Appointment from './pages/Appointment';
import Appointment_Doctor from './pages/Doctor/Appointment';
function App() {
  const {loading} = useSelector((state) => state.alert);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border text-primary " role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>   
        <Route path='register' element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path='/' element={<ProtectRoute><Home/></ProtectRoute>}/>
        <Route path='/apply-doctor' element={<ProtectRoute><ApplyToDoctor/></ProtectRoute>}/>
        <Route path='/notifications' element={<ProtectRoute><Notification/></ProtectRoute>}/>
        <Route path='/admin/list-of-users' element={<ProtectRoute><UserList/></ProtectRoute>}/>
        <Route path='/admin/list-of-doctors' element={<ProtectRoute><DoctorList/></ProtectRoute>}/>
        <Route path='/doctor/profile/:userId' element={<ProtectRoute><DoctorProfile/></ProtectRoute>}/> 
        <Route path='/booking-appointment/:doctorId' element={<ProtectRoute><Booking/></ProtectRoute>}/> 
        <Route path='/appointment' element={<ProtectRoute><Appointment/></ProtectRoute>}/>
        <Route path='/doctor/appointment' element={<ProtectRoute><Appointment_Doctor/></ProtectRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
