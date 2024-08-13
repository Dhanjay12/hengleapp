import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app_url, api_url } from '../common/Helpers';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react'
export default function About() {
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  let uid = localStorage.getItem('uid');
  const [height, setheight] = useState("")
  const [occupation, setoccupation] = useState("")
  const [relationship, setrelationship] = useState("")
  const [smoking, setsmoking] = useState("")

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('uid', uid);
    formDataObj.append('height', height);
    formDataObj.append('occupation', occupation);
    formDataObj.append('relationship', relationship);
    formDataObj.append('smoking', smoking);

    axios.post(api_url + 'saveabout', formDataObj).then((response) => {
      if (response.data.status != 0) {
        navigate(app_url + 'interested');
      } else {
        console.log(response.data);
      }
      setisLoading(false);

    })
      .catch((error) => {
          console.error(error);
      });
  }
  const handleInputChange = (event) => {
    
    if (event.target.value.length <= event.target.maxLength) {
      setheight(event.target.value);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="perfecthight" style={{  height: '100vh', padding: '48px 5px', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
            <div className="container mt-5">
              <h2 style={{ color: 'white', fontSize: '30px',  }}>How about you?</h2>
              <p className="text-white" style={{  marginTop: '-2px', fontWeight: 400 ,fontSize:'14px'}}>please give us your details for matching better persons</p>
              
              <input
              type="number"
              value={height}
              onChange={handleInputChange}
              className="maininput text-white"
              name="number"
              pattern="[0-9]{10}"
              maxLength={3} // Change this to the appropriate maximum length
              required="required"
              placeholder='Height'
            />
              <input type="text" value={occupation} onChange={(event) => { setoccupation(event.target.value) }} className="maininput text-white" name="occupation" placeholder="Occupation" required />
              <input type="text" value={relationship} onChange={(event) => { setrelationship(event.target.value) }} className="maininput text-white" name="relationship" placeholder="Relationship" required />
              <input type="text" value={smoking} onChange={(event) => { setsmoking(event.target.value) }} className="maininput text-white" name="smoking" placeholder="Smoking" required />
              <div className=" d-flex justify-content-center align-items-end " style={{marginTop:'45%'}}>
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