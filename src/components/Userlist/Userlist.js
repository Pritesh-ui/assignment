import React, { useEffect, useState } from "react";
import { User, postdata } from "../../api";
import { useNavigate } from "react-router-dom";
import "./Userlist.css"



const Userlist = () => {
  const [Userdata, SetUserdata] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

//click Event
  const handleUserClick = (userId) => {
    navigate(`/details/${userId}`);
  };

// Getting no of post
  const getPost = async () => {
    try {
      const data = await postdata();

      
      const userPostsMap = data.reduce((map, post) => {
        const userId = post.userId;
        if (map[userId]) {
          map[userId].push(post);
        } else {
          map[userId] = [post];
        }
        return map;
      }, {});

      console.log(userPostsMap);

      // Set the posts state with the array directly
      setPosts(userPostsMap);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // useEffect to get users data and post
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await User();
        SetUserdata(res);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
    getPost();
  }, []);
 
  return (
    <div className="container">
      <div className="heading">
        <h1>Directory</h1>
      </div>
      <br />
      <br />
      <div className="allPost">
        <div className="userPost">
          {Userdata?.map((items, index) => (
            <div
              className="userData"
              key={index}
              onClick={() => {
                handleUserClick(items.id);
              }}
            >
              <p>Name: {items.name}</p>
              <p>Post: {posts[items.id]?.length || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userlist;
