import React, { useContext, useEffect, useState } from 'react';
import searchnot from '../../Assests/noposts-removebg-preview.png';
import defaultimg from '../../Assests/noprofile.jpg';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getuserdata } from '../../Services/userdata.service';
import { getprofile } from '../../Services/profile.service';
import { InstaNav } from '../Insta-NavBar/instanave.component';
import { SearchContext } from '../../Services/contextservice/searchprocontext';
import '../searchUserprofiles/search.component.css';

export default function Show() {
  const { searchTerm } = useContext(SearchContext);
  const [allpostdata, setallpostdata] = useState([]);
  const [profile, setprofile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getuserdata().then((res) => {
      setallpostdata(res.data);
      console.log("User data:", res.data); // Log user data
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });

    getprofile().then((res) => {
      setprofile(res.data);
      console.log("Profile data:", res.data); // Log profile data
    }).catch((error) => {
      console.error("Error fetching profile data:", error);
    });
  }, []);

  useEffect(() => {
    console.log("Search term:", searchTerm);
  }, [searchTerm]);

  const filteredData = allpostdata.filter((item) =>
    item.username && item.username.toLowerCase() === searchTerm.toLowerCase()
  );

  const getProfileImage = (id) => {
    const userProfile = profile.find((prof) => prof.id === id);
    return userProfile ? userProfile.profileimage : defaultimg;
  };

  return (
    <>
      <InstaNav />
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className='cust-profile-container' key={item.id} onClick={() => navigate(`/searchPro/${item.id}`)}>
              <div className='profile-image-container'>
                <Image src={getProfileImage(item.id)} className='cust-pro-img' />
              </div>
              <div>
                <div className='profile-username'>
                  <p>{item.username}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='not-found-container'>
            <img src={searchnot} alt="Not Found" />
            <h4>Search Not Found</h4>
            <p>Try a different keyword or search again</p>
          </div>
        )}
      </div>
    </>
  );
}
