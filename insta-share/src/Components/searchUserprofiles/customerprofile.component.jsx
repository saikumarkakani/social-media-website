import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Image, Spinner } from 'react-bootstrap';
import { BiGrid } from 'react-icons/bi';
import userpic from '../../Assests/noprofile.jpg';
import nopost from '../../Assests/noposts-removebg-preview.png';
import '../searchUserprofiles/customerprofile.component.css';
import { InstaNav } from '../Insta-NavBar/instanave.component';

export function CustomerProfile() {
  const { id } = useParams();
  const [customerposts, setcustomerposts] = useState(null);
  const [imgpost, setimgpost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stories, setstories] = useState([]);
  const [profilepic, setprofilepic] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchProfileDetails(id);
    fetchProfileDetailbyid(id);
    getcustmstories(id);
    getcustmprofile(id);
  }, [id]);

  const fetchProfileDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4003/getsearchprofile/${id}`);
      setimgpost(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  const fetchProfileDetailbyid = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4003/getprofiles/${id}`);
      setcustomerposts(response.data[0]); // Assuming response.data is an array, set the first element
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const getcustmstories = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4003/getcustmstorie/${id}`);
      setstories(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const getcustmprofile = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4003/getcustmprofile/${id}`);
      setprofilepic(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (loading) {
    return (
      <div className='lodingeffect'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!customerposts) {
    return <div>No data available for this username</div>;
  }

  return (
    <>
    <InstaNav />
      <div className='laptop' style={{marginTop:"90px"}}>
        <div className='user-profile-container'>
          <label className='Upro-gap-top user-profile-label'>
            <div className='profile-image-container'>
              <img src={profilepic ? profilepic.profileimage : userpic} className='user-profile' alt="User Profile" />
            </div>
          </label>
        </div>
        <label>
          <div className='Uprofile-text'>{customerposts.username || "Loading..."}</div>
          <div className='P-text-Gap'>
            <label className='Uprofile-text-S'>10 Posts</label>
            <label className='Uprofile-text-S'>200 Followers</label>
            <label className='Uprofile-text-S'>160 Following</label>
          </div>
          <div className='Uprofile-subtext'>{customerposts.username}</div>
          <div className='Uprofile-subtext1'>
            Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony<br></br> Alpha Ambassador OPPO
          </div>
        </label>
      </div>
      <div className='userP-img'>
        {Array.isArray(stories) && stories.map((profile, index) => (
          <div key={index}>
            <img className="user-P-round-image" src={profile.simg} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <hr className='profile-line'></hr>
      <div>
        <label><BiGrid className='userLogo'></BiGrid></label>&nbsp;
        <label className='post-text'>Posts</label>
      </div>
      <div className='UpicStyle'>
        {imgpost.length > 0 ? (
          imgpost.map((item, index) => (
            <div className="Upic" key={index}>
              <img src={item.storyimg} alt="User Post" />
            </div>
          ))
        ) : (
          <div>
            <img src={nopost} className='noposts' alt="No Posts" />
          </div>
        )}
      </div>

    </>
  );
}
