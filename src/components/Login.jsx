import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { api_url, app_url } from '../common/Helpers';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
export default function Login() {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setisLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + ph;
    console.log(formatPh)
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setisLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setisLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        handleSubmit();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }
  const handlePhoneChange = (event) => {
    const inputValue = event.target.value;

    // Remove any non-numeric characters from the input
    const numericValue = inputValue.replace(/\D/g, '');

    // Limit the input to 10 characters
    const limitedValue = numericValue.slice(0, 10);

    // Update the phone state with the cleaned and limited value
    setPh(limitedValue);
  };
  const handleSubmit = () => {
    const formDataObj = new FormData();
    formDataObj.append('number', ph);
    axios.post(api_url+'checkmobile', formDataObj).then((response) => {
      if(response.data.status != 0){
        localStorage.setItem('uid',response.data.uid);
        console.log(response.data)
        if(response.data.alreadyhave == 1){
          navigate(app_url + 'homepage');
        }else{
          navigate(app_url + 'yourdetails');
        }
      }else{
        console.log(response.data);
      }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  return (
    <div className="perfecthight" style={{ height: '100vh', padding: '48px 5px', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
       <div className="container h-100 mt-5">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <div className="h-100">
            {showOTP ? (
              <>
              <h2 style={{ color: 'white', fontSize: '30px', }}>OTP Verification</h2>
            <p className="text-white" style={{ marginTop: '-2px', fontWeight: 400 ,fontSize:'14px' }}>6 digit code has been sent to <span style={{fontWeight: 600, fontSize: '15px'}}>{ph}</span></p>
               <div style={{height: '10%'}}></div>
               <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                  
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container justify-content-center"
                  
                
                ></OtpInput>
                <div className="mt-auto d-flex justify-content-center align-items-end" style={{height: '55%'}}>
               {isLoading ?(
                <button type="button" className="btn btn-sm btn-outline-light">
                <FeatherIcon icon="loader" />
              </button>
               ):(
                <button onClick={onOTPVerify} className="btn btn-sm btn-outline-light">
                Next
              </button>
               )}
           
              </div>
              </>
            ) : (
              <>
              
            <h2 style={{ color: 'white', fontSize: '30px', }}>Login/Register</h2>
            <p className="text-white" style={{ marginTop: '-2px', fontWeight: 400 ,fontSize:'14px'}}>Enter Your Mobile Number</p>
              <input style={{height: '50px'}}
              type="number"
              value={ph} 
              onChange={handlePhoneChange}
              className="maininput text-white"
            
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
                <div className="d-flex justify-content-center align-items-end" style={{marginTop:'118%', paddingBottom:'0px'}}>
                {isLoading ? (
                  <button type="button" className="btn btn-sm btn-outline-light">
                    <FeatherIcon icon="loader" />
                  </button>
                ):(
              <button onClick={onSignup} className="btn btn-sm btn-outline-light">
                Next
              </button>
                )}
            </div>
              </>
            )}
          </div>
      </div>
    </div>
  );
};
