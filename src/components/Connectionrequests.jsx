import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api_assets_url, api_url, app_url } from '../common/Helpers';
import axios from 'axios';
import $ from 'jquery';
import Feathericons from 'feather-icons-react'
export default function Connectionrequests() {
   const navigate = useNavigate();
    let uid = localStorage.getItem('uid');
   const [reqdata, setreqdata] = useState([]);
   useEffect(() => {
      getdatamsg(); 
  }, []);
  const getdatamsg =  async ()=>{
  await axios.get(api_url+'requestconnection/'+uid).then(response => {
      console.log(response.data)
      setreqdata(response.data); 
   })  //calling data
  }
  const viewprofile = (userid)=>{
   localStorage.setItem('viewprofile',userid)
   navigate(app_url + 'profile');
  }
  const AcceptMessage = (receiverid) => {
   const formDataObj = new FormData();
   formDataObj.append('myuid', uid);
   formDataObj.append('thepersoniwanttoaccept', receiverid);
   axios.post(api_url + 'acceptreq', formDataObj).then((response) => {
      if (response.data.status != 0) {
         navigate(app_url + 'messages');
       } else {
         console.log(response.data);
       }
   })
}
const requestreject = (receiverid,index) => {
   const formDataObj = new FormData();
   formDataObj.append('myuid', uid);
     formDataObj.append('thepersoniwanttoaccept', receiverid);
   axios.post(api_url + 'rejectrequest', formDataObj).then((response) => {
      if (response.data.status != 0) {
         navigate(app_url + 'connection'); 
       } else {
         console.log(response.data);
       }
   })
   $('#card' + index).fadeOut('slow', function() {
      // The code inside this callback function will be executed after the fade-out animation is complete.
      $(this).remove();
    });
    
 }
 
   return (
      <>
         <div>
            
            <div className="perfecthight" style={{ minHeight: '100vh', maxHeight:'100%', padding: '10px 0', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
               <div className="container mt-2" style={{ padding: '20px' }}>
                  <h2 style={{ color: 'white', fontSize: '30px', fontFamily:'nunito'}}>Connection Requests</h2>
                  <p className="text-white" style={{ fontSize: '11px',fontSize: '14px',marginTop:'-6px', fontWeight: 100, fontFamily:'nunito'  }}>Toast to new connections, embrace the unknown at the pub!</p>
                  {reqdata.map((item,key) => (
                  <div className='card px-3' id={'card'+key} style={{ background: '#4D333E', borderRadius: '10px', marginTop: '30px' }}>
                     <div className='text-end pt-1' style={{ height: '10px', color: '#FBFF54', fontWeight: 'bold', fontSize: '10px', marginRight: '-7px' }}>{item.date}, {item.time}</div>
                     <div className='row'>
                        <div className="col-2 d-flex justify-content-center">
                           <img onClick={()=>{viewprofile(item.uid)}} src={api_assets_url+"profilepicture/"+item.profilephoto} style={{ height: '50px', width: '50px' }} />
                        </div>
                        <div className="col-8 text-white p-0">
                           <div style={{ fontWeight: 600, textTransform: 'capitalize' }} onClick={()=>{viewprofile(item.uid)}}>{item.uname}</div>
                           <div className="" style={{ fontSize: '12px' }}><Feathericons size={15} style={{ paddingBottom: '3px', fontFamily:'nunito' }} icon="map-pin" />
                              <div className='d-inline-block'>{item.location}</div>
                           </div>
                           <div style={{ fontWeight: 100, fontSize: '9px', lineHeight: '12px', marginBottom: '10px', fontFamily:'nunito' }}>{item.looking}</div>
                        </div>
                        <div className="col-2 d-flex align-items-center">
                           <button className='xrosshover' onClick={()=>{requestreject(item.uid,key)}}  style={{ backgroundColor: '#311F27', border: 'none', color: 'red', height: '30px', width: '35px', borderRadius: '20px' }}>
                              <i class="fa-solid fa-xmark" style={{ fontSize: '13px' }}></i>
                           </button>
                        </div>
                     </div>
                     <div className='row text-white vertical' style={{ padding: '5px', textAlign: 'center', borderTop: '1px solid white' }}>
                        <button onClick={()=>{viewprofile(item.uid)}} className="col-6 text-white" style={{ backgroundColor: '#543342', border: 'none', fontWeight: 600, fontSize: '13px', borderRight: '1px solid white' }}>View Profile</button>
                        <button onClick={()=>{AcceptMessage(item.uid)}} className="col-6 text-white" style={{ backgroundColor: '#543342', border: 'none', fontWeight: 600, fontSize: '13px' }}>Accept & Message</button>
                     </div>
                  </div>
                  ))}
               </div>
               <div className="flex-lg-column my-auto glasscreen mx-2" style={{
                  position: 'fixed',
                  width: '95%',
                  bottom: '10px',
                  padding: '2px 10px'
               }}>
                  <ul className="nav nav-pills side-menu-nav justify-content-around" role="tablist">
                     <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Profile" data-bs-original-title="Profile" role="presentation">
                        <Link to={app_url + 'homepage'}>
                           <span className="nav-link" id="pills-user-tab activethis" data-bs-toggle="pill" role="tab" aria-selected="false" tabIndex={-1}>
                              <img className="home" src={app_url + 'assets/image/home.png'} alt />
                           </span>
                        </Link>
                     </li>
                     <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Chats" data-bs-original-title="Chats" role="presentation">
                        <Link to={app_url + 'connection'}>
                           <span className="nav-link active" id="pills-chat-tab" data-bs-toggle="pill" role="tab" aria-selected="true">
                              <img className="home" src={app_url + 'assets/image/link.png'} alt />
                           </span>
                        </Link>
                     </li>
                     <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Chats" data-bs-original-title="Chats" role="presentation">
                     <Link to={app_url + 'postrequest'}>
                        <span className="nav-link" id="pills-chat-tab" data-bs-toggle="pill" role="tab" aria-selected="true">
                           <img className="home" src={app_url + 'assets/image/add.png'} alt />
                        </span>
                     </Link>
                  </li>
                     <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Contacts" data-bs-original-title="Contacts" role="presentation">
                        <Link to={app_url + 'messages'}>
                           <span className="nav-link" id="pills-contacts-tab" data-bs-toggle="pill" role="tab" aria-selected="false" tabIndex={-1}>
                              <img className="home" src={app_url + 'assets/image/messenger.png'} alt />
                           </span>
                        </Link>
                     </li>
                     <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Settings" data-bs-original-title="Settings" role="presentation">
                        <Link to={app_url + 'ownprofile'}>
                           <span className="nav-link" id="pills-setting-tab" data-bs-toggle="pill" role="tab" aria-selected="false" tabIndex={-1}>
                              <img className="home" src={app_url + 'assets/image/user.png'} alt />
                           </span>
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
}