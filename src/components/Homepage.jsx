import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { api_url, app_url, api_assets_url } from "../common/Helpers";
import Feathericons from "feather-icons-react";
import axios from "axios";
import $ from "jquery";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import introJs from "intro.js";
import "intro.js/introjs.css";
export default function Homepage() {
  function showPopupIntro() {
    const intro = introJs()
      .setOptions({
        hidePrev: true,
        hideNext: true,
        exitOnOverlayClick: false,
        exitOnEsc: false,
        steps: [
          {
            element: document.querySelector("button"),
            intro:
              "<p>Swap Right to Send & Swap Left to Reject</p>" +
              '<video src="https://essaneinfotech.com/mhengleapp/storage/app/video/intro.mp4" autoplay loop />',
            tooltipClass: "wideo",
          },
        ],
      })
      .oncomplete(() => (document.cookie = "intro-complete=true"));

    // Listen for the close button click event
    const closeButton = document.querySelector(".introjs-skipbutton");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        const formDataObj = new FormData();
        formDataObj.append("uid", uid);
        formDataObj.append("isintro", 1);
        axios.post(api_url + "updateintro", formDataObj).then((response) => {
          console.log(response);
        });
      });
    }

    const start = () => intro.start();

    // Check if intro has already been completed
    if (document.cookie.split(";").indexOf("intro-complete=true") < 0) {
      window.setTimeout(start, 1000);
    } else {
      start();
    }
  }

  let uid = localStorage.getItem("uid");
  const AcceptMessage = (id, receiverid) => {
    const formDataObj = new FormData();
    formDataObj.append("id", id);
    formDataObj.append("uid", uid);
    formDataObj.append("requestid", receiverid);
    axios.post(api_url + "sendconnection", formDataObj).then((response) => {
      console.log(response);
    });
  };

  const requestreject = (id, receiverid) => {
    const formDataObj = new FormData();
    formDataObj.append("id", id);
    formDataObj.append("myuid", uid);
    formDataObj.append("thepersoniwanttoaccept", receiverid);
    axios.post(api_url + "rejectrequest", formDataObj).then((response) => {
      console.log(response);
    });
  };
  const navigate = useNavigate();
  const leadingActions = (id, receiverid) => {
    const handleSendRequest = () => {
      AcceptMessage(id, receiverid);
    };
    return (
      <LeadingActions>
        <SwipeAction destructive={true} onClick={handleSendRequest}>
          <div className="d-flex align-items-center justify-content-center">
            <span
              className="badge badge-success sliderdelete d-flex align-items-center justify-content-center"
              style={{ height: "70%", marginTop: "30px", minWidth: "100%" }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "25px",
                  fontFamily: "Nunito",
                }}
              >
                Send
              </span>
            </span>
          </div>
        </SwipeAction>
      </LeadingActions>
    );
  };

  const trailingActions = (id, receiverid) => {
    const handleSendRequest = () => {
      requestreject(id, receiverid);
    };
    return (
      <TrailingActions>
        <SwipeAction destructive={true} onClick={handleSendRequest}>
          <div className="d-flex align-items-center justify-content-center">
            <span
              className="badge badge-danger sliderdelete d-flex align-items-center justify-content-center"
              style={{ height: "70%", marginTop: "30px", minWidth: "100%" }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "25px",
                  fontFamily: "Nunito",
                }}
              >
                Delete
              </span>
            </span>
          </div>
        </SwipeAction>
      </TrailingActions>
    );
  };
  const [data, setData] = useState([]);
  const [reqdata, setreqdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sliderdata, setsliderdata] = useState([]);
  let scanlocation = localStorage.getItem("scanlocation");
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    setloading(true);
    await axios
      .get(api_url + "getallrequests/" + uid + "/" + scanlocation)
      .then((response) => {
        setreqdata(response.data);
        localStorage.removeItem("scanlocation");
        setloading(false);
      });
    await axios.get(api_url + "getuserdata/" + uid).then((response) => {
      setData(response.data);
      console.log(response.data);
      if (response.data.isintro == 0) {
        showPopupIntro();
      }
    });
    await axios.get(api_url + "getbanners").then((response) => {
      setsliderdata(response.data);
    });
    await axios
      .get(api_url + "updateonlineoffline/" + uid + "/" + 1)
      .then((response) => {
        console.log(response.data);
      });
  };
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
  const viewprofile = (userid) => {
    localStorage.setItem("viewprofile", userid);
    navigate(app_url + "profile");
  };

  useEffect(() => {
    reloadonetime();
  }, []);
  const reloadonetime = () => {
    if (!window.location.hash) {
      window.location = window.location + "##";
      window.location.reload();
    }
  };
  return (
    <div>
      {loading ? (
        <>
          <div id="preloader">
            <div>
              <img
                src={app_url + "assets/image/Hengle.png"}
                style={{ height: "120px" }}
              />
            </div>
          </div>
        </>
      ) : (
        <div
          className="perfecthight"
          style={{
            minHeight: "100vh",
            padding: "30px 0",
            background:
              "linear-gradient(180deg, rgba(8,0,5,1) 0%, rgba(42,0,29,1) 50%, rgba(79,0,55,1) 100%)",
            position: "relative",
          }}
        >
          <div className="container mt-2">
            <div>
              <span>
                <Link
                  to={app_url + "scanner"}
                  className="d-flex justify-content-end text white"
                  style={{ marginBottom: "-30px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-qr-code-scan"
                    viewBox="0 0 16 16"
                    style={{ color: "#fff" }}
                  >
                    <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z" />
                    <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z" />
                    <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z" />
                    <path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z" />
                    <path d="M12 9h2V8h-2v1Z" />
                  </svg>
                  {/* <img src={app_url+'assets/image/scanner-preview.png'} alt="" style={{ height: '50px' }} /> */}
                </Link>
              </span>
              <h2 style={{ color: "white", fontSize: "30px" }}>
                Hi, {data.name}
              </h2>
            </div>
            <p
              className="text-white"
              style={{ fontSize: "14px", marginTop: "-6px", fontWeight: 100 }}
            >
              Mix, sip, connect - Pubbing redefined.
            </p>
            <div className="py-4">
              <div className="row d-flex justify-content-center">
                <div className="col-12 px-2">
                  <div style={{ position: "relative", width: "100%" }}>
                    <input
                      type="search"
                      style={{
                        height: "50px",
                        backgroundColor: "#3E333B",
                        border: "none",
                        borderRadius: "10px",
                        width: "100%",
                        fontSize: "13px",
                        paddingRight: "40px", // Add padding to accommodate the clear icon
                        color: "white",
                      }}
                      className="px-2 py-2 text-white"
                      placeholder="Search by location or name"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && ( // Show the clear icon only when there's some text in the search bar
                      <button
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={() => setSearchQuery("")} // Clear the search query when clicked
                        aria-label="Clear search"
                      >
                        {/* Replace the `X` with your preferred clear icon (e.g., an SVG icon) */}
                        X
                      </button>
                    )}
                  </div>
                </div>
                {/* <div className="col-2">
                        <div>
                           <img style={{ height: '40px', backgroundColor: '#3E333B', padding: '9px', borderRadius: '10px' }} src={app_url + 'assets/image/search.png'} />
                        </div>
                     </div> */}
              </div>
            </div>
            <p className="text-white " style={{ fontSize: "18px" }}>
              Events near you
            </p>
            <div style={{ height: "200px" }}>
              <Slider {...settings}>
                {sliderdata.map((slide) => (
                  <div key={slide.id} style={{ width: "10px" }}>
                    <div
                      style={{
                        overflow: "hidden",
                        width: "100%",
                        maxHeight: "200px",
                        minHeight: "200px",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        style={{ transform: "scale(1.1)" }}
                        className="img-fluid"
                        src={api_assets_url + "homebanner/" + slide.image}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <p
              className="text-white mt-5"
              style={{ fontSize: "18px", fontWeight: 600 }}
            >
              Ready to be found? They're searching !
            </p>

            {reqdata
              .filter((item) => {
                const searchTerm = searchQuery.toLowerCase();
                const nameMatch = item.uname.toLowerCase().includes(searchTerm);
                const locationMatch = item.location
                  .toLowerCase()
                  .includes(searchTerm);
                const dateMatch = item.date.toLowerCase().includes(searchTerm);
                const timeMatch = item.time.toLowerCase().includes(searchTerm);

                // You can add more fields to search here if needed

                // Return true if any of the fields match the search query
                return nameMatch || locationMatch || dateMatch || timeMatch;
              })
              .map((item, index) => (
                <SwipeableList>
                  <SwipeableListItem
                    leadingActions={leadingActions(item.id, item.uid)}
                    trailingActions={trailingActions(item.id, item.uid)}
                  >
                    <div className="d-flex justify-content-center">
                      <div
                        className="card px-3 "
                        id={"cardhide" + index}
                        style={{
                          width: "100%",
                          background: "#4D333E",
                          borderRadius: "10px",
                          marginTop: "30px",
                        }}
                      >
                        <div
                          className="text-end pt-1"
                          style={{
                            height: "10px",
                            color: "#FBFF54",
                            fontWeight: "bold",
                            fontSize: "10px",
                            marginRight: "-7px",
                          }}
                        >
                          {item.date}, {item.time}
                        </div>
                        <div className="row">
                          <div className="col-2 d-flex justify-content-center hovercursor">
                            <img
                              onClick={() => {
                                viewprofile(item.uid);
                              }}
                              src={
                                api_assets_url +
                                "profilepicture/" +
                                item.profile
                              }
                              style={{
                                height: "50px",
                                width: "40px",
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                          <div className="col-8 text-white p-0">
                            <div
                              className="hovercursor"
                              onClick={() => {
                                viewprofile(item.uid);
                              }}
                              style={{
                                fontWeight: 600,
                                textTransform: "capitalize",
                                fontFamily: "Nunito",
                              }}
                            >
                              {item.uname}
                            </div>
                            <div className="" style={{ fontSize: "12px" }}>
                              <Feathericons
                                size={15}
                                style={{ paddingBottom: "3px" }}
                                icon="map-pin"
                              />
                              <div className="d-inline-block">
                                {item.location}
                              </div>
                            </div>
                            <div
                              style={{
                                fontWeight: 100,
                                fontSize: "11px",
                                lineHeight: "12px",
                                marginBottom: "10px",
                                minWidth: "230px",
                                maxWidth: "100%",
                              }}
                            >
                              {item.description}
                            </div>
                          </div>
                          <div
                            className="col-2 d-flex align-items-center"
                            style={{ height: "30px", width: "35px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </SwipeableListItem>
                </SwipeableList>
              ))}
          </div>
          <div
            className="flex-lg-column my-auto glasscreen mx-2"
            style={{
              position: "fixed",
              width: "95%",
              bottom: "10px",
              padding: "2px 10px",
            }}
          >
            <ul
              className="nav nav-pills side-menu-nav justify-content-around"
              role="tablist"
            >
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Profile"
                data-bs-original-title="Profile"
                role="presentation"
              >
                <Link to={app_url + "homepage"}>
                  <span
                    className="nav-link active"
                    id="pills-user-tab activethis"
                    data-bs-toggle="pill"
                    role="tab"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    <img
                      className="home"
                      src={app_url + "assets/image/home.png"}
                      alt
                    />
                  </span>
                </Link>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Chats"
                data-bs-original-title="Chats"
                role="presentation"
              >
                <Link to={app_url + "connection"}>
                  <span
                    className="nav-link "
                    id="pills-chat-tab"
                    data-bs-toggle="pill"
                    role="tab"
                    aria-selected="true"
                  >
                    <img
                      className="home"
                      src={app_url + "assets/image/link.png"}
                      alt
                    />
                  </span>
                </Link>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Chats"
                data-bs-original-title="Chats"
                role="presentation"
              >
                <Link to={app_url + "postrequest"}>
                  <span
                    className="nav-link "
                    id="pills-chat-tab"
                    data-bs-toggle="pill"
                    role="tab"
                    aria-selected="true"
                  >
                    <img
                      className="home"
                      src={app_url + "assets/image/add.png"}
                      alt
                    />
                  </span>
                </Link>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Contacts"
                data-bs-original-title="Contacts"
                role="presentation"
              >
                <Link to={app_url + "messages"}>
                  <span
                    className="nav-link"
                    id="pills-contacts-tab"
                    data-bs-toggle="pill"
                    role="tab"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    <img
                      className="home"
                      src={app_url + "assets/image/messenger.png"}
                      alt
                    />
                  </span>
                </Link>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Settings"
                data-bs-original-title="Settings"
                role="presentation"
              >
                <Link to={app_url + "ownprofile"}>
                  <span
                    className="nav-link"
                    id="pills-setting-tab"
                    data-bs-toggle="pill"
                    role="tab"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    <img
                      className="home"
                      src={app_url + "assets/image/user.png"}
                      alt
                    />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
