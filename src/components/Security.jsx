import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { app_url } from '../common/Helpers';
import {toast } from 'react-toastify';
export default function Security() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isChecked) {
      // Show the toast message at the top-right corner
      toast.error("Please agree to the terms and conditions.", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }else{
      navigate(app_url + 'login');
    }
    // Perform form submission logic here
  };
  return (
    <div>
      
      <div className="perfecthight" style={{ minHeight:'100vh',padding: '48px 0', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
        <div className="container" style={{ padding: '20px',marginTop: '5px' }}>
          <div className="mt-auto d-flex justify-content-center align-items-end">
            <h2 className="text-white" style={{ marginBottom: '80px', marginTop: '25px', fontSize: '25px' }}>Safety & Security Terms</h2>
          </div>
          <div className="row">
            <div className="col-3 d-flex justify-content-center">
              <img src={app_url + 'assets/image/encryptedone.png'} style={{ maxWidth: '70px' }} alt="" />
            </div>
            <div className="col-9">
              <h6 style={{ color: 'white', fontWeight: '700' }}>Data Security</h6>
              <p className='' style={{ fontSize: '12px', color: '#fff',fontWeight: 300, marginTop:'-5px' }}>Your data messages are fully encrypted <br /> in non decryption tach.</p>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-3 d-flex justify-content-center">
              <img src={app_url + 'assets/image/encryptedtwo.png'} style={{ maxWidth: '70px' }} alt="" />
            </div>
            <div className="col-9">
              <h6 style={{ color: 'white', fontWeight: '700' }}>No spam</h6>
              <p style={{ fontSize: '12px', color: '#fff',fontWeight: 300, marginTop:'-5px' }}>WE don't spam with your data with calls or<br />emails thats a promise form Hengle.</p>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-3 d-flex justify-content-center">
              <img src={app_url + 'assets/image/encryptedthree.png'} style={{ maxWidth: '70px' }} alt="" />
            </div>
            <div className="col-9">
              <h6 style={{ color: 'white', fontWeight: '700' }}>24Hrs data Obliteration</h6>
              <p style={{ fontSize: '12px', color: '#fff',fontWeight: 300, marginTop:'-5px' }}>All your listings data with messages will be<br />completely deleted the same day.</p>
            </div>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="row ps-5 pt-4" style={{ marginTop: '50px'}}>
              <div className="col-1 py-1">
                <input  type="checkbox" className="form-check-input" checked={isChecked} onChange={handleCheckboxChange} />
              </div>
              <div className="col-10 mb-5" style={{ paddingLeft: '0px' }}>
                <p style={{ fontSize: '12px', color: '#fff' }}>By clicking this I accept <b>Privacy policy, Terms</b><br /><b>& Conditions</b> with <b>data policy</b>.</p>
              </div>
            </div>
            <div className="mt-auto d-flex justify-content-center align-items-end">
              <button type='submit' className="btn btn-sm btn-outline-light mb-5" style={{ marginTop: '17%' }}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
