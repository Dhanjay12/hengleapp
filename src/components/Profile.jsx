import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { app_url, api_url, api_assets_url } from '../common/Helpers';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import Slider from 'react-slick';
import 'react-image-lightbox/style.css'; // Import the lightbox styles
import CombinedImageLightbox from './CombinedImageLightbox';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageLightbox from './ImageLightbox';
export default function MySlider() {
  const [profilephoto, setprofilephoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const handleFileChangeprofile = (event) => {
    setprofilephoto(event.target.files[0]);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileChange1 = (event) => {
    setSelectedFile1(event.target.files[0]);
  };

  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };

  const navigate = useNavigate();
  let myuid = localStorage.getItem('uid');
  let uid = localStorage.getItem('viewprofile');

  const AcceptMessage = (receiverid) => {
    const formDataObj = new FormData();
    formDataObj.append('myuid', myuid);
    formDataObj.append('thepersoniwanttoaccept', receiverid);
    axios.post(api_url + 'acceptreq', formDataObj).then((response) => {
       if (response.data.status != 0) {
          navigate(app_url + 'messages');
        } else {
          console.log(response.data);
        }
    })
 }
 const requestreject = (receiverid) => {
  const formDataObj = new FormData();
  formDataObj.append('myuid', myuid);
    formDataObj.append('thepersoniwanttoaccept', receiverid);
  axios.post(api_url + 'rejectrequest', formDataObj).then((response) => {
     if (response.data.status != 0) {
        navigate(app_url + 'profile'); 
      } else {
        console.log(response.data);
      }
  })
}


  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  // Implementing the jQuery-like behavior with useEffect
  useEffect(() => {
    const handleFileSelect = (event, imageId, plusId) => {
      const fileInput = event.target;
      const imageElement = document.querySelector(imageId);
      const plusElement = document.getElementById(plusId);

      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imageElement.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);

        // Update CSS styles
        imageElement.style.cssText = `
          position: absolute;
          height: 100%;
          width: 100%;
          margin: 0;
          top: 0;
          left: 0;
          border-radius: 10px;
        `;

        plusElement.style.display = 'none';
      }
    };

    // Set up event listeners using useRef
    fileInputRef.current.addEventListener('change', (event) => {
      handleFileSelect(event, '#wizardPicturePreview', 'plusone');
      handleFileChangeprofile(event); // Call the handleFileChange function as well
    });
    fileInputRef1.current.addEventListener('change', (event) => {
      handleFileSelect(event, '#wizardPicturePreview1', 'plusone1');
      handleFileChange(event); // Call the handleFileChange function as well
    });

    fileInputRef2.current.addEventListener('change', (event) => {
      handleFileSelect(event, '#wizardPicturePreview2', 'plusone2');
      handleFileChange1(event); // Call the handleFileChange1 function as well
    });

    fileInputRef3.current.addEventListener('change', (event) => {
      handleFileSelect(event, '#wizardPicturePreview3', 'plusone3');
      handleFileChange2(event); // Call the handleFileChange2 function as well
    });
  }, []);
  const [data, setData] = useState([]);
  const [name, setname] = useState("")
  const [gender, setgender] = useState("")
  const [age, setage] = useState("")
  const [location, setlocation] = useState("")
  const [avourite, setavourite] = useState("")
  const [interests, setinterests] = useState("")
  const [bio, setbio] = useState("")
  const [looking, setlooking] = useState("")
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    await axios.get(api_url + 'getuserdata/' + uid).then(response => {
      setData(response.data);
      setname(response.data.name)
      setgender(response.data.gender)
      setage(response.data.age)
      setlocation(response.data.location)
      setavourite(response.data.avourite)
      setinterests(response.data.interests)
      setbio(response.data.bio)
      setlooking(response.data.looking)
    })

  }

  // Sample data for the slider
  // const MySlider = ({ sliderData }) => {
    // const YourComponent = ({ data }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  
    const openLightbox = (index) => {
      setLightboxImageIndex(index);
      setLightboxOpen(true);
    };
  
    const closeLightbox = () => {
      setLightboxOpen(false);
    };
  
  const sliderData = [
    { id: 2, imgurl: data.image_one},
    { id: 3, imgurl: data.image_two},
    { id: 3, imgurl: data.image_three},

  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable auto slide
    autoplaySpeed: 2000, // Set the time between slides to 3000 milliseconds (3 seconds)
    prevArrow: <></>, // Custom empty component to hide previous arrow
    nextArrow: <></>, // Custom empty component to hide next arrow
  };

  const divStyle = {
    height: '150px',
    width: '150px',
    border: '1px solid #82737B',
    borderRadius: '100%',
    zIndex: 1,
    backgroundImage: `url(${api_assets_url + "profilepicture/"+data.profilephoto})`,
    backgroundSize: 'cover',
    zIndex: 9999
  };
  return (
    <div>      
      <div className="perfecthight" style={{ maxHeight: '100%',minHeight: '100vh', padding: '50px 0', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
        <div className="container" style={{ padding: '10px 10px 5px 10px', maxWidth: '98%', borderRadius: '10px' }}>
        <h2 className='text-center mb-4' style={{ color: 'white', fontSize: '17px',marginTop: '-30px', fontFamily:'nunito' }}>View Profile</h2>
        <Slider {...settings}>
  {sliderData.map((slide, index) => (
    // Check if the image URL is available before rendering
    slide.imgurl && (
      <div key={slide.id} style={{ width: '10px' }}>
        <div className='mx-auto' style={{ overflow: 'hidden', width: '100%'}}>
          <img
            onClick={() => openLightbox(index)}
            className='img-fluid mx-auto'
            style={{ height: 210, maxWidth: '100%', borderRadius: '15px', border: '1px solid #82737B' }}
            src={api_assets_url + "profilepicture/" + slide.imgurl}
            alt=""
          />
        </div>
      </div>
    )
  ))}
</Slider>

      <ImageLightbox
        isOpen={lightboxOpen}
        imageUrl={api_assets_url + "profilepicture/" + sliderData[lightboxImageIndex]?.imgurl}
        onClose={closeLightbox}
      />
        </div>
        <div className={`d-flex justify-content-center zindexthenextdiv ${sliderData.some(slide => slide.imgurl !== null) ? 'marginTopNeg80' : 'marginTop10'}`}>
          <CombinedImageLightbox imageUrl={api_assets_url + "profilepicture/" + data.profilephoto} divStyle={divStyle} />
          {/* <div style={divStyle}></div> */}
        </div>
        <div className='d-flex justify-content-center text-white py-2' style={{fontSize: '25px',fontFamily: 'Nunito'}}>{data.name}</div>
        <div id="main" className='mt-5'>
          <div class="container">
            <div class="accordion" id="faq">
              <div class="card">
                <div class="card-header" id="faqhead1">
                  <a href="#" class="btn btn-header-link" data-toggle="collapse" data-target="#faq1" style={{ fontFamily:'nunito'}}
                    aria-expanded="true" aria-controls="faq1"><i style={{fontSize: '20px', marginRight:'10px'}} class="fa-solid fa-user"></i>Profile Details</a>
                </div>

                <div id="faq1" class="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                  <div class="card-body text-white" style={{ fontFamily:'nunito'}}>
                    <input type="text" value={name} onChange={(event) => { setname(event.target.value) }} className="maininput border-btm mt-4 text-white" name="name" readOnly={true} placeholder="Name" />
                    <input type="text" value={gender} onChange={(event) => { setgender(event.target.value) }} className="maininput border-btm mt-4 text-white" name="gender" readOnly={true} placeholder="Gender" />
                    <input type="number" value={age} onChange={(event) => { setage(event.target.value) }} className="maininput border-btm mt-4 text-white" name="age" readOnly={true} placeholder="Age" />
                    <input type="text" value={location} onChange={(event) => { setlocation(event.target.value) }} className="maininput border-btm mt-4 text-white" name="location" readOnly={true} placeholder="Location" />
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="faqhead2">
                  <a href="#" class="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq2" style={{ fontFamily:'nunito'}}
                    aria-expanded="true" aria-controls="faq2"><i style={{fontSize: '20px', marginRight:'10px'}} class="fa-solid fa-face-laugh-beam"></i>Profile Interest</a>
                </div>

                <div id="faq2" class="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                  <div class="card-body text-white" style={{ fontFamily:'nunito'}}>
                    <input type="text" value={avourite} onChange={(event) => { setavourite(event.target.value) }} className="maininput border-btm mt-4 text-white" name="avourite" readOnly={true} placeholder="Favourite" />
                    <input type="text" value={interests} onChange={(event) => { setinterests(event.target.value) }} className="maininput border-btm mt-4 text-white" name="interests" readOnly={true} placeholder="Interests" />
                    <input type="text" value={bio} onChange={(event) => { setbio(event.target.value) }} className="maininput border-btm mt-4 text-white" name="bio" readOnly={true} placeholder="Bio" />
                    <input type="text" value={looking} onChange={(event) => { setlooking(event.target.value) }} className="maininput border-btm mt-4 text-white" name="looking" readOnly={true} placeholder="Looking for?" />
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="faqhead3">
                  <a href="#" class="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq3" style={{ fontFamily:'nunito'}}
                    aria-expanded="true" aria-controls="faq3"><i style={{fontSize: '20px', marginRight:'10px'}} class="fa-solid fa-image"></i>Profile Look</a>
                </div>
                <div id="faq3" class="collapse" aria-labelledby="faqhead3" data-parent="#faq">
                  <div class="card-body text-white">
                    <div className="row ">
                      <div className="col-6">
                        <div style={{ position: 'relative' }} className="drag-file-area ">
                          <span className="browse-files">
                            <input
                              type="file"
                              id="wizard-picture1"
                              name="filename1"
                              ref={fileInputRef}
                              className="default-file-input"
                              onChange={handleFileChangeprofile}
                              style={{ height: '100%', width: '100%', zIndex: '1' }}
                            />
                            {data.profilephoto != 0 ?
                              <>
                                <img style={{
                                  position: 'absolute',
                                  height: '100%',
                                  width: '100%',
                                  margin: 0,
                                  top: 0,
                                  left: 0,
                                  borderRadius: '10px',
                                  zIndex:999
                                }} className="picture-src" src={api_assets_url + "profilepicture/" + data.profilephoto} id="wizardPicturePreview" alt="" />
                                <span id="plusone" style={{ position: 'absolute', top: '70px', left: '0', height: '100%', width: '100%' }} className="browse-files-text text-white">

                                </span>
                              </>
                              :
                              <>
                                <img className="picture-src" id="wizardPicturePreview" alt="" />

                                <span id="plusone" style={{ position: 'absolute', top: '70px', left: '0', height: '100%', width: '100%' }} className="browse-files-text text-white">
                                  <p style={{ color: 'white', }}>Upload your photos</p>
                                </span>
                              </>
                            }
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ position: 'relative' }} className="drag-file-area ">
                          <span className="browse-files">
                            <input
                              type="file"
                              id="wizard-picture1"
                              name="filename1"
                              ref={fileInputRef1}
                              className="default-file-input"
                              onChange={handleFileChange}
                              style={{ height: '100%', width: '100%', zIndex: '1' }}
                            />
                            {data.image_one != 0 ?
                              <>
                                <img style={{
                                  position: 'absolute',
                                  height: '100%',
                                  width: '100%',
                                  margin: 0,
                                  top: 0,
                                  left: 0,
                                  borderRadius: '10px',
                                  zIndex:999
                                }} className="picture-src" src={api_assets_url + "profilepicture/" + data.image_one} id="wizardPicturePreview1" alt="" />
                                <span id="plusone1" style={{ position: 'absolute', top: '70px', left: '0', height: '100%', width: '100%' }} className="browse-files-text text-white">

                                </span>
                              </>
                              :
                              <>
                                <img className="picture-src" id="wizardPicturePreview1" alt="" />

                                <span id="plusone1" style={{ position: 'absolute', top: '70px', left: '0', height: '100%', width: '100%' }} className="browse-files-text text-white">
                                  <p style={{ color: 'white' }}>Upload your photos</p>
                                </span>
                              </>
                            }
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ position: 'relative' }} className="drag-file-area ">
                          <span className="browse-files">
                            <input
                              type="file"
                              id="wizard-picture2"
                              name="filename1"
                              ref={fileInputRef2}
                              className="default-file-input"
                              onChange={handleFileChange1}
                              style={{ height: '100%', width: '100%', zIndex: '1' }}
                            />
                            {data.image_two != 0 ?
                              <>
                                <img style={{
                                  position: 'absolute',
                                  height: '100%',
                                  width: '100%',
                                  margin: 0,
                                  top: 0,
                                  left: 0,
                                  borderRadius: '10px',
                                  zIndex:999
                                }} className="picture-src"  src={api_assets_url + "profilepicture/" + data.image_two} id="wizardPicturePreview2" alt="" />
                                <span id="plusone2" style={{ position: 'absolute', top: '70px', left: '0', height: '100%', width: '100%' }} className="browse-files-text text-white">

                                </span>
                              </>
                              :
                              <>
                                <img className="picture-src" id="wizardPicturePreview2" alt="" />
                                <span id="plusone2" style={{ position: 'absolute', top: '70px', left: '0', height: '100%', width: '100%' }} className="browse-files-text text-white">
                                  <p style={{ color: 'white' }}>Upload your photos</p>
                                </span>
                              </>
                            }
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ position: 'relative' }} className="drag-file-area ">
                          <span className="browse-files">
                            <input
                              type="file"
                              id="wizard-picture3"
                              name="filename1"
                              ref={fileInputRef3}
                              className="default-file-input"
                              onChange={handleFileChange2}
                              style={{ height: '100%', width: '100%', zIndex: '1' }}
                            />
                            {data.image_three != 0 ?
                              <>
                                <img style={{
                                  position: 'absolute',
                                  height: '100%',
                                  width: '100%',
                                  margin: 0,
                                  top: 0,
                                  left: 0,
                                  borderRadius: '10px',
                                  zIndex:999
                                }} className="picture-src" src={api_assets_url + "profilepicture/" + data.image_three} id="wizardPicturePreview3" alt="" />
                                <span id="plusone3" style={{ position: 'absolute', top: '70px', left: '0', height: '100%', width: '100%' }} className="browse-files-text text-white">

                                </span>
                              </>
                              :
                              <>
                                <img className="picture-src" id="wizardPicturePreview3" alt="" />

                                <span id="plusone3" style={{ position: 'absolute', top: '70px', left: '0', height: '100%', width: '100%' }} className="browse-files-text text-white">
                                  <p style={{ color: 'white' }}>Upload your photos</p>
                                </span>
                              </>
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center mx-3 mb-5'>
          <button type='submit' onClick={()=>{requestreject(uid)}} className='buttonhover' style={{
          background: '#7D153A',
          color: 'white',
          border: 'none',
          padding: '10px 55px 10px 55px',
          borderRadius: '10px ',  
          cursor: 'pointer',
           }}>Reject</button>
          <button type='submit' onClick={()=>{AcceptMessage(uid)}} className='buttonhover' style={{
          background: '#7B4D6D',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '10px',
          cursor: 'pointer'}}>Connect & Message</button>
        </div>
        <div className="flex-lg-column my-auto glasscreen mx-2" style={{
          position: 'fixed',
          width: '95%',
          bottom: '10px',
          padding: '2px 10px',
          zIndex: '99999'
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
                <span className="nav-link" id="pills-chat-tab" data-bs-toggle="pill" role="tab" aria-selected="true">
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
  );
  }
