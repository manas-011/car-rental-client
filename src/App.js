import './App.css';
import {Route , Routes , BrowserRouter , Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingCar from './pages/BookingCar'
import AddCar from './pages/AddCar';
import UserBookings from './pages/UserBookings' ;
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import { userLogin } from './redux/actions/userActions';

// import 'antd/dist/antd.css';

function App() {

  const isAuthenticated = localStorage.getItem('user');
  let _id ;

  if (isAuthenticated) {
    const user = JSON.parse(isAuthenticated);
    _id = user._id;
    console.log(_id);
  }

  const Admin_id = "64907a7376b1f052cb672a22" ;

  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route
           path="/" 
           element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
           } />

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />

          <Route
            path="/booking/:carid"
            element={
              isAuthenticated ? (
                <BookingCar />
              ) : (
                <Navigate to="/login"  />
              )
            }
          />

          <Route
            path="/userbookings"
            element={
              isAuthenticated ? (
                <UserBookings />
              ) : (
                <Navigate to="/login"  />
              )
            }
          />

          <Route
           path='/addcar'
            element={
              ( Admin_id === _id ) ? (
                <AddCar />
              ) : (
                <Navigate to="/"  />
              )
            }
          />

          <Route
           path='/admin'
            element={
               ( Admin_id === _id ) ? (
                <AdminHome />
              ) : (
                <Navigate to="/"  />
              )
            }
          />

          <Route
           path='/editcar/:carid'
            element={
              ( Admin_id === _id ) ? (
                <EditCar />
              ) : (
                <Navigate to="/"  />
              )
            }
          />

        </Routes>
         
      </BrowserRouter>
    </div>
  );
}

export default App ;

