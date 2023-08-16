import Signup from './components/authentication/Signup';
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/authentication/Profile';
import Login from './components/authentication/Login';
import PrivateRoute from './components/authentication/PrivateRoute';
import ForgotPassword from './components/authentication/ForgotPassword';
import UpdateProfile from './components/authentication/UpdateProfile';

function App() {
  return (
    <BrowserRouter >
          <AuthProvider >
            <Routes>
              <Route element={<PrivateRoute 
                componentToRender={<Profile />}
              />}>
                <Route path='/' element={<Profile />} />
              </Route>
              <Route path='/signup' element={<Signup />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/forgot-password' element={<ForgotPassword />}/>
              <Route element={<PrivateRoute componentToRender={<UpdateProfile />}/>}>
                <Route path='/update-profile' element={<UpdateProfile />} />
              </Route>
            </Routes>
          </AuthProvider>
    </BrowserRouter>
  );
}

export default App;