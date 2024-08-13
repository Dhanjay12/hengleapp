import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { app_url, api_url } from '../common/Helpers';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';

export default function Look() {
  const [isLoading, setisLoading] = useState(false);
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
  let uid = localStorage.getItem('uid');

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('uid', uid);
    formDataObj.append('profilephoto', profilephoto);
    formDataObj.append('filename1', selectedFile);
    formDataObj.append('filename2', selectedFile1);
    formDataObj.append('filename3', selectedFile2);

    axios
      .post(api_url + 'savedoyoulook', formDataObj)
      .then((response) => {
        if (response.data.status !== 0) {
          navigate(app_url + 'welcome');
        } else {
          console.log(response.data);
        }
        setisLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        setisLoading(false);
      });
  };

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

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="perfecthight" style={{ height: '100vh', padding: '48px 5px', background: 'linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)' }}>
            <div className="container mt-5">
              <h2 style={{ color: 'white', fontSize: '30px', }}>How do you look ?</h2>
              <p className="text-white" style={{  marginTop: '-2px', fontWeight: 400 ,fontSize:'14px' }}>if i can know how you look i can suggest better profiles</p>
              <div className="row" style={{marginTop:'15%'}}>
                <div className="col-6">
                <div style={{ position: 'relative' }} className="drag-file-area ">
                    <span className="browse-files">
                      <input
                        type="file"
                        id="wizard-picture1"
                        name="filename1"
                        ref={fileInputRef}
                        className="default-file-input"
                        onChange={handleFileChange}
                        style={{ height: '100%', width: '100%', zIndex: '1' }}
                      />
                      <img className="picture-src" id="wizardPicturePreview" onClick={() => fileInputRef.current.click()} alt="" />
                      <span id="plusone" style={{ position: 'absolute', top: '70px', left: '0',height: '100%',width: '100%' }} className="browse-files-text text-white">
                      <p style={{ color: 'white' }}>Upload your photos</p>
                      </span>
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
                      <img className="picture-src" id="wizardPicturePreview1" onClick={() => fileInputRef1.current.click()} alt="" />
                      <span id="plusone1" style={{ position: 'absolute', top: '45%', left: '48%' }} className="browse-files-text text-white">+</span>
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
                      <img className="picture-src" id="wizardPicturePreview2" onClick={() => fileInputRef2.current.click()} alt="" />
                      <span id="plusone2" style={{ position: 'absolute', top: '45%', left: '48%' }} className="browse-files-text text-white">+</span>
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
                      <img className="picture-src" id="wizardPicturePreview3" onClick={() => fileInputRef3.current.click()} alt="" />
                      <span id="plusone3" style={{ position: 'absolute', top: '45%', left: '48%' }} className="browse-files-text text-white">+</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-end" style={{marginTop:'32%'}}>
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
