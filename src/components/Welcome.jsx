import React, { useState, useEffect } from 'react';
import { app_url,api_url } from '../common/Helpers';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Welcome() {
  let uid = localStorage.getItem('uid');
  const [data, setData] = useState([]);
  useEffect(() => {
    getdata();
 }, []);
  const getdata = async () => {
    await axios.get(api_url + 'getuserdata/'+ uid).then(response => {
       setData(response.data);
    })}
  return (
    <>
      <div>
        <div className="perfecthight" style={{ height: '100vh', padding: '48px 5px', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
          <div className="mt-auto d-flex justify-content-center align-items-center" style={{ height: '' }}>
            <img style={{ height: '100px', marginTop: 100 }} src={app_url + 'assets/image/Hengle.png'} />
          </div>
          <div className="mt-auto d-flex justify-content-center align-items-end" style={{ height: '20vh' }}>
            <h3 className="text-white" style={{ fontSize: 35, fontFamily: 'Nunito' }}>Hi, {data.name}</h3>
          </div>
          <div className="mt-auto d-flex justify-content-center align-items-end" style={{ height: '10vh', fontFamily: 'Nunito' }}>
            <span className="text-center" style={{ color: '#B9B2B9' }}>Unveiling the Pub's Social Magic,<br />Hengle Connects Hearts with a Click!</span>
          </div>
          <div className=" d-flex justify-content-center align-items-end" style={{marginTop:'30%'}}>
           <Link to={app_url + 'homepage'} className="btn btn-sm btn-outline-light">
              I'm In
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="body">
  <div className="mt-auto d-flex justify-content-center align-items-center" style={{height: ''}}>
<img  style={{height: '100px', marginTop: 100}} src={app_url+'assets/image/hengle.png'} />
  </div>
  <div className="mt-auto d-flex justify-content-center align-items-end" style={{height: '20vh'}}>
    <h3 className="text-white" style={{fontSize: 35, fontFamily: 'Nunito'}}>Hi, $username</h3>
  </div>
  <div className="mt-auto d-flex justify-content-center align-items-end" style={{height: '10vh', fontFamily: 'Nunito'}}>
    <span className="" style={{color: '#B9B2B9'}}>Unveiling the pub's social magic<br />Hengle connect Heart with a click</span> 
  </div>
  <div className="mt-auto d-flex justify-content-center align-items-end" style={{height: ''}}>
    <a href="{{url('/home')}}">
      <button type="submit" className="btn btn-sm btn-outline-light" style={{height: 30 , marginTop: 150, marginBottom: 20}}>
        I'm In
      </button>
    </a>
  </div>
</div> */}
    </>
  );
}