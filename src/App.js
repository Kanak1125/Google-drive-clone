import Signup from './components/authentication/Signup';
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/authentication/Profile';
import Login from './components/authentication/Login';
import PrivateRoute from './components/authentication/PrivateRoute';
import ForgotPassword from './components/authentication/ForgotPassword';
import UpdateProfile from './components/authentication/UpdateProfile';
import Dashboard from './components/google-drive/Dashboard';
import PrivateRoute2 from './components/authentication/PrivateRoute2';

function App() {
  return (
    <BrowserRouter >
          <AuthProvider >
            <Routes>
              <Route element={<PrivateRoute 
                componentToRender={<Profile />}
              />}>
                <Route path='/user' element={<Profile />} />
              </Route>
              <Route element={<PrivateRoute2 componentToRender={<Signup />}/>}>
                <Route path='/signup' element={<Signup />}/>
              </Route>
              <Route element={<PrivateRoute2 componentToRender={<Login />}/>}>
                <Route path='/login' element={<Login />}/>
              </Route>
              <Route element={<PrivateRoute2 componentToRender={<ForgotPassword />}/>}>
                <Route path='/forgot-password' element={<ForgotPassword />}/>
              </Route>
              <Route element={<PrivateRoute componentToRender={<UpdateProfile />}/>}>
                <Route path='/update-profile' element={<UpdateProfile />} />
              </Route>
              <Route element={<PrivateRoute componentToRender={<Dashboard />}/>}>
                <Route path='/' element={<Dashboard />}/>
              </Route>
            </Routes>
          </AuthProvider>
    </BrowserRouter>
  );
}

export default App;