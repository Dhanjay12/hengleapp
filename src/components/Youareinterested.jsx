import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app_url, api_url } from '../common/Helpers';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react'
export default function Interested() {
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  let uid = localStorage.getItem('uid');
  const [avourite, setavourite] = useState("")
  const [interests, setinterests] = useState("")
  const [bio, setbio] = useState("")
  const [looking, setlooking] = useState("")
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('uid', uid);
    formDataObj.append('avourite', avourite);
    formDataObj.append('interests', interests);
    formDataObj.append('bio', bio);
    formDataObj.append('looking', looking);

    axios.post(api_url + 'saveinterested', formDataObj).then((response) => {
      if (response.data.status != 0) {
        navigate(app_url + 'youlook');
      } else {
        console.log(response.data);
      }
      setisLoading(false);
    })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="perfecthight" style={{ height: '100vh', padding: '48px 5px', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
            <div className="container mt-5">
              <h2 style={{ color: 'white', fontSize: '30px', }}>You're interested in?</h2>
              <p className="text-white" style={{  marginTop: '-2px', fontWeight: 400 ,fontSize:'14px' }}>please give us your details for matching better persons</p>
              <input style={{marginTop:'80px'}} type="text" value={avourite} onChange={(event) => { setavourite(event.target.value) }} className="maininput text-white" name="avourite" placeholder="Favourite" required />
              <input type="text" value={interests} onChange={(event) => { setinterests(event.target.value) }} className="maininput text-white" name="interests" placeholder="Interests" required />
              <input type="text" value={bio} onChange={(event) => { setbio(event.target.value) }} className="maininput text-white" name="bio" placeholder="Bio" required />
              <input type="text" value={looking} onChange={(event) => { setlooking(event.target.value) }} className="maininput text-white" name="looking" placeholder="Looking" required />
              <div className="d-flex justify-content-center align-items-end"  style={{marginTop:'45%'}}>
                {isLoading ? (
                  <button type="button" className="btn btn-sm btn-outline-light">
                    <FeatherIcon icon="loader" />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-sm btn-outline-light">
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}