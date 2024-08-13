import React,{ useState , useEffect } from 'react';
import axios from 'axios';
import './Custom.css';
import { BrowserRouter, Routes, Route, Navigate,useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import { api_url, app_url } from './common/Helpers';
import Security from './components/Security';
import Login from './components/Login';
import Yourdetails from './components/Yourdetails';
import Howaboutyou from './components/Howaboutyou';
import Youareinterested from './components/Youareinterested';
import Howdoyoulook from './components/Howdoyoulook';
import Welcome from './components/Welcome';
import Homepage from './components/Homepage';
import Connectionrequests from './components/Connectionrequests';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Viewmessage from './components/Viewmessage';
import Ownprofile from './components/Ownprofile';
import PostRequest from './components/PostRequest';
import Scanner from './components/Scanner';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('uid');

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to={app_url} replace />
  );
};
function App() {
return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route path={app_url} element={<Security />} />
          <Route path={app_url+'login'} element={<Login />} />
          <Route path={app_url+'yourdetails'} element={<ProtectedRoute component={Yourdetails} />} />
          <Route path={app_url+'aboutyou'} element={<ProtectedRoute component={Howaboutyou} />} />
          <Route path={app_url+'interested'} element={<ProtectedRoute component={Youareinterested} />} />
          <Route path={app_url+'youlook'} element={<ProtectedRoute component={Howdoyoulook} />} />
          <Route path={app_url+'welcome'} element={<ProtectedRoute component={Welcome} />} />
          <Route path={app_url+'homepage'} element={<ProtectedRoute component={Homepage} />}  />
          <Route path={app_url+'connection'} element={<ProtectedRoute component={Connectionrequests} />} />
          <Route path={app_url+'postrequest'} element={<ProtectedRoute component={PostRequest} />} />
          <Route path={app_url+'messages'} element={<ProtectedRoute component={Messages} />} />
          <Route path={app_url+'profile'} element={<ProtectedRoute component={Profile} />} />
          <Route path={app_url+'viewmessage'} element={<ProtectedRoute component={Viewmessage} />} />
          <Route path={app_url+'ownprofile'} element={<ProtectedRoute component={Ownprofile} />} />
          <Route path={app_url+'scanner'} element={<ProtectedRoute component={Scanner} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;