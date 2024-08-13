import React, { useState,useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { app_url, api_url, getCurrentDate} from '../common/Helpers';
import axios from 'axios';
import { range } from 'lodash';
import FeatherIcon from 'feather-icons-react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { getYear, getMonth,format } from 'date-fns';
export default function AddRequest() {
 const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  let uid = localStorage.getItem('uid');
  // const [location, setlocation] = useState("")
  const [selectedOption, setSelectedOption] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedDate, setdatepickar] = useState(new Date())
  const years = range(1990, new Date().getFullYear() + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const customHeaderStyles = {
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: "5px 10px",
    borderRadius: "5px",
  };

  const buttonStyles = {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    outline: "none",
  };
  const [time, settime] = useState("")
  const [looking, setlooking] = useState("")
  const [description, setdescription] = useState("")
  const [reqdata, setreqdata] = useState([]);
  const [locationdata, locationshow] = useState([]);

  
  useEffect(() => {
    const externalTime = time;
    if (/^\d{2}:\d{2}$/.test(externalTime)) {
      const [hours, minutes] = externalTime.split(':');
      const hour = parseInt(hours, 10);
      const minute = parseInt(minutes, 10);

      let formattedTime = `${hour % 12 === 0 ? 12 : hour % 12}:${minute.toString().padStart(2, '0')}`;
      formattedTime += hour >= 12 ? ' PM' : ' AM';

      console.log('Formatted Time:', formattedTime);
      settime(formattedTime);
    } else {  
      console.error('Invalid time format:', externalTime);
      settime('');
    }
    getdata();
    axios.get(api_url + 'locationlist')
    .then(response => {
      console.log(response.data); // Confirming the data

      const options = response.data.map(locationItem => ({
        value: locationItem.id,
        label: locationItem.location
      }));
      setLocationOptions(options);
      
      locationshow(response.options); // This line might be causing issues
    })
    .catch(error => {
      console.error("Error fetching location data:", error);
    });

  }, []);
const getdata = async () => {
   setisLoading(true);
   await axios.get(api_url + 'myrequest/' + uid).then(response => {
      setreqdata(response.data);
      setisLoading(false)
   })
   
 
}
  const postrequestSubmit = (e) => {
   setisLoading(true);
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('uid', uid);
    formDataObj.append('location', selectedOption.label);
    formDataObj.append('locationid', selectedOption.value);
    formDataObj.append('date',getCurrentDate(selectedDate));
    formDataObj.append('time', time);
    formDataObj.append('looking', looking);
    formDataObj.append('description', description);

    
    axios.post(api_url + 'addrequest', formDataObj).then((response) => {
        console.log(response.data);
        getdata();
        setisLoading(false);
    })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
  const handleInputChange = selectedOption => {
    console.log("Selected option:", selectedOption);
    setSelectedOption(selectedOption);
  };
//   const handleInputChange = (event) => {
//    if (event.target.value.length <= event.target.maxLength) {
//       setlocation(event.target.value);
//    }
//  };
 const openthis = (e) => {
  setSelectedOption('')
    setdatepickar('')
    settime('')
    setlooking('')
    setdescription('')

}

  return (
<div>
<div className="perfecthight" style={{ height: '100vh', padding: '48px 0', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
   <div className="container h-100">
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 p-0">
					<div className="card" style={{backgroundColor:'#10000A'}}>
						<div className="card-header px-1 d-flex justify-content-between align-items-center">
							<h4 className="card-title text-white" style={{fontSize: '16px'}}>Your previous posts</h4>
              <button type="button" onClick={() => { openthis() }} className="btn text-white"  data-bs-toggle="modal"data-bs-target="#exampleModal" data-bs-whatever="@mdo" style={{ backgroundColor: 'rgb(73 29 51)' }}>
               Add 
              </button>
						</div>
            <div className="card-body px-1 pt-0">
							<div className="table-responsive">
								<table id="example2" className="table">
									<thead>
										<tr>
											<th className="text-white">Location</th>
											<th className="text-white" style={{minWidth: '115px'}}>Date</th>
                      <th className="text-white">Time</th>
											<th className="text-white">Looking</th>
											<th className="text-white">Description</th>
											{/* <th className="text-white">Status</th> */}
                                 
										</tr>
									</thead>
									<tbody>
                           {reqdata.map((udata) => (	
										<tr>
                                 <td className='text-white'>{udata.location}</td>
                                 <td className='text-white'>{udata.date}</td>
                                 <td className='text-white'>{udata.time}</td>
                                 <td className='text-white'>{udata.looking}</td>
                                 <td className='text-white'>{udata.description}</td>
                                 {/* <td>
                                 {udata.status == 0 ? (
                                    <span className="badge badge-danger">Pending</span>
                                 ) : (
                                    <span className="badge badge-success">Connected</span>
                                 )}
                                 </td> */}
                               </tr>
                        ))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
                        <span className="nav-link " id="pills-chat-tab" data-bs-toggle="pill" role="tab" aria-selected="true">
                           <img className="home" src={app_url + 'assets/image/link.png'} alt />
                        </span>
                     </Link>
                  </li>
                  <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Chats" data-bs-original-title="Chats" role="presentation">
                     <Link to={app_url + 'postrequest'}>
                        <span className="nav-link active" id="pills-chat-tab" data-bs-toggle="pill" role="tab" aria-selected="true">
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
    
   
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
  <div className="modal-content" style={{ background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)'}}>
  <div className="modal-header" style={{ borderBottom: 'none' }}>
  <div>
  <h2 style={{ color: 'white', fontSize: '24px' }}>Looking for someone?</h2>
  <p className="text-white" style={{ marginTop: '-2px', fontWeight: 400, fontSize: '11px' }}>
  Connect instantly, share endlessly: connection made magical!
  </p>
</div>
<button type="button" style={{marginTop: '3px',border: '1px solid white', padding:'3px'}} className="btn-close btn custom-close-button" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="card-body" style={{border: '1px solid #824D72',borderRadius: '10px' }}>
        <form onSubmit={postrequestSubmit}>
          <div className="locationid" style={{marginBottom:'40px'}}>
          <label className="col-form-label"></label>
          <Select
              value={selectedOption}
              onChange={handleInputChange}
              options={locationOptions}
              placeholder="Select a location"
              className="custom-dropdown "
              required
            />
            {/* <label className="col-form-label"></label>
            <input type="text" onChange={handleInputChange} value={location}  maxLength={250}  style={{ background: 'transparent', border: '1px solid #824D72',color:'white', }}
        className="form-control "
        placeholder="Location"
        id="recipient-name"
        required
      />     */}
         </div>
         <div className="mb-3">
      <label className="col-form-label"></label>
      <DatePicker

        renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <div style={customHeaderStyles}>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} style={buttonStyles}>
              {"<"}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} style={buttonStyles}>
              {">"}
            </button>
          </div>
        )}
        selected={selectedDate} 
        className='form-control text-white'
        onChange={(date) => setdatepickar(date)} 
        style={{ background: 'transparent'}}
        placeholderText='Select date'
        dateFormat="dd/MM/yyyy" 
      />
    </div>
          {/* <div className="mb-3">
            <label  className="col-form-label"></label>
            <input autoComplete='of' type="date" value={date} onChange={(event) => { setdatepickar(event.target.value) }} name="date" id="date-format" class="form-control" style={{background: 'transparent',border: '1px solid #824D72',color:'white',}} placeholder="Date" required="required"/>
          </div> */}
          <div className="mb-3">
      <label className="col-form-label"></label>
      
      <input autoComplete="off" type="time" name="time" value={time} onChange={(event) => { settime(event.target.value) }} id="date-format" className="form-control text-white" style={{ background: 'transparent', border: '1px solid #824D72',color:'white', }}  placeholderText='Select Time' required/>
      </div>
      

          <div className="mb-3">
            <label  className="col-form-label"></label>
            <input autoComplete='of' type="looking" name="looking" value={looking} onChange={(event) => { setlooking(event.target.value) }} class="form-control" style={{background: 'transparent',border: '1px solid #824D72',color:'white',}} placeholder="looking" required="required"/>
          </div>
          <label for="textarea1"></label>
      <textarea class="form-control" name='description' id="textarea1" value={description} onChange={(event) => { setdescription(event.target.value) }} style={{background: 'transparent',border: '1px solid #824D72',color:'white',}} rows="3" placeholder="Description"></textarea>
          <div className="modal-footer d-flex justify-content-center" style={{ borderTop: 'none' }}>
          {isLoading ? (
                  <button type="button" className="btn btn-sm btn-outline-light">
                    <FeatherIcon icon="loader" />
                  </button>
                ) : (
         <button type="submit" className="btn btn-danger mt-4" style={{background: 'transparent',border: '1px solid #824D72'}} data-bs-toggle="modal"data-bs-target="#exampleModal">Add me in</button>
         )}
         </div>
        </form>
      </div>
      </div>
    </div>
  </div>
</div>
 </div>
    );
  }
