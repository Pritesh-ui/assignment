import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import {
  fetchCountry,
  fetchCountrytime,
  getUserByID,
  postdata,
} from "../../api";
import "./userDetails.css";

const UserDetails = () => {
  //All the Usestates
  const { id } = useParams();
  const [user, setUser] = useState();
  const [country, setcountry] = useState([]);
  const [ctime, setCtime] = useState();
  const [countryTZ, setCountryTZ] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Use Navigation
  const navigate = useNavigate();

  // Global Variable
  var isPause = false;
  let formattedTime = countryTZ?.datetime
    ?.toString()
    ?.split("T")[1]
    ?.split("-")[0]
    ?.split(".")[0];

  // All the click function
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePopup = () => {
    setSelectedPost(null);
  };

  const handlePause = () => {
    isPause = !isPause;
  };

  // fetching User details
  const fetchData = () => {
    // console.log(id)
    getUserByID(id)
      .then((data) => {
        setUser(data);
        // console.log("success", data);
        return;
      })
      .catch((e) => {
        console.log("failed", e);
        return;
      });
  };

  useEffect(() => {
    fetchData();
    postDatas(id);
  }, [id]);

  // fetching post data
  const postDatas = (id) => {
    // console.log('******id xyz', id)
    postdata()
      .then((data) => {
        // console.log("success", data);
        const data1 = getSpecificUserPosts(id, data);
        // console.log("$$$$$",data1)
        setPost(data1);

        return;
      })
      .catch((e) => {
        console.log("failed", e);
        return;
      });
  };
  const getSpecificUserPosts = (userId, posts) => {
    const userPosts = posts.filter((post) => post.userId == userId);
    return userPosts;
  };

  //  Country And timer Code

  const countrySelect = async () => {
    const res = await fetchCountry();
    setcountry(res);
  };
  const countryTZSelect = async () => {
    console.log("selectedCountry", selectedCountry);

    const res = await fetchCountrytime(selectedCountry);
    //  console.log("timezone",res)

    setCountryTZ(res);
  };
  useEffect(() => {
    countrySelect();
    countryTZSelect();
  }, [selectedCountry]);

  const addOneSec = (timeString) => {
    if (!timeString) {
      return timeString;
    }
    const time = timeString.split(":");
    let [hours, minutes, seconds] = time;
    hours = Number(hours);
    minutes = Number(minutes);
    seconds = Number(seconds) + 1;
    if (seconds >= 60) {
      seconds -= 60;
      minutes += 1;
    }
    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
    if (hours >= 24) {
      hours = 0;
    }
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    // console.log(`${hours}:${minutes}:${seconds}`);
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (formattedTime) {
      var timeInterval = setInterval(() => {
        if (!isPause) {
          formattedTime = addOneSec(formattedTime);
          console.log(formattedTime, "*****");
          setCtime(formattedTime);
        }
      }, 1000);
      document.getElementById("pauseButton").addEventListener("click", () => {
        handlePause(timeInterval);
      });
    }
  }, [formattedTime]);

  return (
    <div className="box">
      <div className="cardcontent">
        <div className="upperSection">
          <div className="back-nav">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="buttons"
            >
              Back
            </button>
          </div>

          <br />
          <br />

          <div className="timerSection">
            <span>
              <button
                style={{ backgroundColor: "lightgreen" }}
                className="buttons"
                id="pauseButton"
                onClick={handlePause}
              >
                Pause/start
              </button>
            </span>
            &nbsp;&nbsp;
            <span className="timer">{ctime}</span>
            &nbsp;&nbsp;
            <span>
              <select
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  console.log("selection", e.target.value);
                }}
                className="countrySelect"
              >
                <option>Select Country</option>
                {country?.map((item) => {
                  return (
                    <>
                      <option value={item}>{item}</option>
                    </>
                  );
                })}
              </select>
            </span>
          </div>
        </div>

        <br />
        <br />

        <div className="heading">
          <h1>Profile Page</h1>
        </div>

        <br />
        <br />

        <div className="userInfo">
          <div className="userInfoPartOne">
            <p>{user?.name}</p>
            <br />
            <p>
              {user?.username} | {user?.company.catchPhrase}
            </p>
          </div>
          <div className="userInfoPartSecond">
            <p>
              {user?.address.street},{user?.address.city},
              {user?.address.zipcode}
            </p>
            <br />
            <p>
              {user?.email} | {user?.phone}
            </p>
          </div>
        </div>
        <br />
        <br />

        <div className="post-container">
          <div className="totalPost">
            {post.map((data) => (
              <div
                key={data.id}
                className="post-item"
                onClick={() => handlePostClick(data)}
              >
                <div className="post">
                  <p>Title: {data.title}</p>
                  <br />
                  <p>Content: {data.body}</p>
                </div>
              </div>
            ))}

            {selectedPost && (
              <div className="popup-overlay" onClick={handleClosePopup}>
                <div
                  className="popup-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>Title: {selectedPost.title}</p>
                  <br />
                  <p>Content: {selectedPost.body}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
