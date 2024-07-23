


import '../User-Profile/userprofile.component.css';
import userpic from '../../Assests/noprofile.jpg';
import profile from '../../Assests/pro2.jpeg';
import profile1 from '../../Assests/pro3.jpeg';
import profile2 from '../../Assests/pro4.jpeg';
import { BiGrid } from 'react-icons/bi';
import { InstaNav } from '../Insta-NavBar/instanave.component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import noposts from '../../Assests/noposts-removebg-preview.png';
import { getuserdata } from '../../Services/userdata.service';
import { Link } from 'react-router-dom';
import { Addpost } from '../Add-Posts/addpost.component';
import { FaUserEdit } from "react-icons/fa";
import Popup from './popup-profile-update/popup';
import { AddProfilePopup } from './popup-profile-update/addprofilepopup/addprofilepopup';
import { IoMdAddCircle } from "react-icons/io";



export function UserProfile() {
    const [prof, setProf] = useState([]);
    const [userData, setUserData] = useState(null);
    const [userProfile, setUserProfile] = useState({});
    const [postImg, setPostImg] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [showPosts, setShowPosts] = useState(false); // State to control Addpost component display
    const [showAddProfilePic, setShowAddProfilePic] = useState(false);
    const [addpropopup, setaddpropopup] = useState(false);
    const [profilepic, setprofilepic] = useState([]);
   const [storypic,setstorypic] = useState([]);
  

    //update profile popup
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleAddClick = () => {
        setShowSubmenu(!showSubmenu);
    };
    const addprofilePopup = () => {
           setaddpropopup(!addpropopup);
          };

          const handleAddProfilePicClick = () => {
                    setShowAddProfilePic(!showAddProfilePic);
                    if (showSubmenu) {
                        setShowSubmenu(false);
                    }
                };

    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (data) {
            setUserData(JSON.parse(data));
        }
        getuserdata().then((res) => {
            setProf(res.data);
        });
    }, []);


    //home post storys based on id s
    useEffect(() => {
        if (userData && userData.length > 0) {
            const sid = userData[0].id;
            axios.get(`http://localhost:4003/getprofile/${sid}`)
                .then((res) => {
                    setTimeout(() => {
                        setUserProfile(res.data[0] || {});
                        setPostImg(res.data.slice(1));
                        setLoading(false);
                    }, 1000);
                })
                .catch((error) => {
                    console.error('Error fetching profile data:', error);
                    setLoading(false);
                });
        }
    }, [userData]);



 // user upload profile based on id s
    useEffect(() => {
        if (userData && userData.length > 0) {
            const sid = userData[0].id;
            axios.get(`http://localhost:4003/getuserprofile/${sid}`)
                .then((res) => {
                    setprofilepic(res.data[0]);
                    console.log(res.data);
                  
                })
                
                .catch((error) => {
                    console.error('Error fetching profile data:', error);
                    setLoading(false);
                });
        }
    }, [userData]);


     // user upload storys  based on id s
     useEffect(() => {
        if (userData && userData.length > 0) {
            const cid = userData[0].id;
            axios.get(`http://localhost:4003/getaddstory/${cid}`)
                .then((res) => {
                    setstorypic(res.data); // Assuming res.data is an array of stories
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error('Error fetching profile data:', error);
                    setLoading(false);
                });
        }
    }, [userData]);


    if (loading) {
        return <div className='loading'>Loading...</div>;
    }


    return (
        <div>
              
            <InstaNav />
            <div className='laptop'>
            <div className='user-profile-container'>
                                     <label className='Upro-gap-top user-profile-label'>
                         <div className='profile-image-container'>

                          
                       
                         <img src={profilepic?profilepic.profileimage:userpic} className='user-profile' alt="User Profile" />

                             <div className='edit-icons'>

                                 <button className='add-button1' onClick={handleAddProfilePicClick}>{/*<IoIosAddCircleOutline className='log-pro' />*/}</button>
                                <button className='add-button' onClick={handleAddClick}><IoMdAddCircle /></button>
                            </div>
                       </div>
                       {showSubmenu && (
                            <div className='submenu'>
                                <Link to="/addpost"><button>Add Post</button></Link>
                                <button onClick={togglePopup}>Change Profile</button>
                                {/*<button  onClick={() => setShowDeletePopup(true)}>Remove DP</button>*/}
                            </div>
                        )}
                        {showAddProfilePic && (
                            <div className='submenu1'>
                                <button onClick={addprofilePopup}><FaUserEdit /></button>

                            </div>
                        )}
                    </label>
                </div>
                <label>
                    <div className='Uprofile-text'>{userProfile.username || "Loading..."}</div>
                    <div className='P-text-Gap'>
                        <label className='Uprofile-text-S'>10 Posts</label>
                        <label className='Uprofile-text-S'>200 Followers</label>
                        <label className='Uprofile-text-S'>160 Following</label>
                    </div>
                    <div className='Uprofile-subtext'>{userProfile.username}</div>
                    <div className='Uprofile-subtext1'>
                        Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony<br></br> Alpha Ambassador OPPO
                    </div>
                </label>

             
            </div>
            <div className='mobile'>
            <label className='Upro-gap-top user-profile-label'>
                       
                    
                         <div className='profile-image-container'>

                          
                       
                         <img src={profilepic?profilepic.profileimage:userpic} className='user-profile' alt="User Profile" />

                             <div className='edit-icons'>

                                 <button className='add-button1' onClick={handleAddProfilePicClick}>{/*<IoIosAddCircleOutline className='log-pro' />*/}</button>
                                <button className='add-button' onClick={handleAddClick}><IoMdAddCircle className='p-log' /></button>
                            </div>
                       </div>
                       {showSubmenu && (
                            <div className='submenu'>
                                <Link to="/addpost"><button>Add Post</button></Link>
                                <button onClick={togglePopup}>Change Profile</button>
                                {/*<button  onClick={() => setShowDeletePopup(true)}>Remove DP</button>*/}
                            </div>
                        )}
                        {showAddProfilePic && (
                            <div className='submenu1'>
                               <button onClick={addprofilePopup}><FaUserEdit /></button>

                            </div>
                        )}
               
                    </label>
                <label>
                    <div className='Uprofile-text'>{userProfile.username || "Loading..."}</div>
                    <div className='P-text-Gap'>
                        <div style={{ display: 'flex', marginLeft: 10, marginTop: 30 }}>
                            <div >
                                <span className='upposts'>
                                    <span style={{ marginLeft: 9 }}>79</span><br></br>
                                    <span>posts</span>
                                </span>
                            </div>
                            <div>
                                <span className='upposts'>
                                    <span style={{ marginLeft: 9 }}>379</span><br></br>
                                    <span>followers</span>
                                </span>
                            </div>
                            <div>
                                <span className='upposts'>
                                    <span style={{ marginLeft: 9 }}>179</span><br></br>
                                    <span>following</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='Uprofile-subtext'>{userProfile.username}</div>
                    <div className='Uprofile-subtext1'>
                        Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony<br></br> Alpha Ambassador OPPO
                    </div>
                </label>
            </div>
            <div className='userP-img'>
        {/* Check if spic is an array before mapping over it */}
        {Array.isArray(storypic) && storypic.map((profile, index) => (
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
                {postImg.length > 0 ? (
                    postImg.map((item) => (
                        <div className="Upic" key={item.id}>
                            <img src={item.storyimg} alt="User Post" />
                        </div>
                    ))
                ) : (
                    <div>
                        <img src={noposts} className='noposts' alt="No Posts" />
                    </div>
                )}
            </div>
            {/* Render Addpost component conditionally */}
            {showPosts && <Addpost></Addpost>}
                {/* Render Popup component conditionally */}
           {isOpen && <Popup handleClose={togglePopup} />} 
            {addpropopup && <AddProfilePopup handleClose={addprofilePopup} />}

{/* 
            <div>
            <ModalPopup open={showDeletePopup} title="Remove Profile" closeModal={() => setShowDeletePopup(false)}>
                    <DeletePopup removeProfilePic={deleteProfilePic} closePopup={() => setShowDeletePopup(false)} />
                </ModalPopup>

            </div> */}

        </div>
    );
}


