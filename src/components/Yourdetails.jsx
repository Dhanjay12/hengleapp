import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app_url, api_url } from '../common/Helpers';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react'
export default function YourDetails() {
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  let uid = localStorage.getItem('uid');
  const [name, setname] = useState("")
  const [gender, setgender] = useState("")
  const [age, setage] = useState("")
  const [location, setlocation] = useState("")

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('uid', uid);
    formDataObj.append('name', name);
    formDataObj.append('gender', gender);
    formDataObj.append('age', age);
    formDataObj.append('location', location);

    axios.post(api_url + 'saveyourdetails', formDataObj).then((response) => {
      if (response.data.status != 0) {
        navigate(app_url + 'aboutyou');
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
  const handleInputChange = (event) => {
    // Ensure input value doesn't exceed the maximum length
    if (event.target.value.length <= event.target.maxLength) {
      setage(event.target.value);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="perfecthight" style={{ height: '100vh', padding: '48px 5px',background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
          <div className="container mt-5">
            <h2 style={{ color: 'white', fontSize: '30px', }}>Your Details</h2>
            <p className="text-white" style={{  marginTop: '-2px', fontWeight: 400 ,fontSize:'14px'}}>please give us your details for matching better persons</p>
            <input style={{marginTop:'80px'}} type="text" value={name} onChange={(event) => { setname(event.target.value) }} className="maininput text-white" name="name" placeholder="Name" required />
            {/* <input type="text" value={gender} onChange={(event) => { setgender(event.target.value) }} className="maininput text-white" name="gender" placeholder="Gender" required /> */}
            <select name="gender" value={gender} onChange={(event) => { setgender(event.target.value) }} id="" class="maininput" required>
            <option value="">-Select Gender-</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
      </select>
            <input
              type="number"
              value={age}
              onChange={handleInputChange}
              className="maininput text-white"
              name="number"
              pattern="[0-9]{10}"
              maxLength={2} // Change this to the appropriate maximum length
              required="required"
              placeholder='Age'
            />
            <input type="text" value={location} onChange={(event) => { setlocation(event.target.value) }} className="maininput text-white" name="location" placeholder="Location" required />
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
  );
}