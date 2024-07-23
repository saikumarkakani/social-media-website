// import '../user3/user3.component.css';
// import userpic from '../../../../Assests/user3.jpeg';
// import { BiGrid } from 'react-icons/bi';
// import { InstaNav } from '../../../Insta-NavBar/instanave.component';
// import { FaCamera } from "react-icons/fa";

// export function User3() {
//     return (
//         <div>
//             <InstaNav></InstaNav>
            
//             <div>
//                 <label className='Upro-gap-top3'>
//                     <img src={userpic} className='user-profile3'></img>
//                 </label>
//                 <label>
//                     <div className='Uprofile-text3'>Dabboo Ratnani</div>
//                     <div className='P-text-Gap3'>
//                         <label className='Uprofile-text-S3'>0 Posts</label>
//                         <label className='Uprofile-text-S3' >200 Followers</label>
//                         <label className='Uprofile-text-S3'>160 Following</label>
//                     </div>
//                     <div className='Uprofile-subtext3'>Dabboo_Ratnani</div>
//                     <div className='Uprofile-subtext13'>Dabboo Ratnani Photography, Mumbai, Maharashtra. 2073644 likes · 50600 talking about this.<br></br> Celebrity & Fashion Photographer. </div>
//                 </label>
//             </div>
//             <br></br>
           
//             <hr className='profile-line3'></hr>
//             <div>
//                 <label><BiGrid className='userLogo3'></BiGrid></label>&nbsp;
//                 <label className='post-text3'>Posts</label>
//             </div>
//            <div className='cam-boarder'> <FaCamera  className='cam-log'/> </div>
//            <div className='nopost'>No Posts Yet</div>

//         </div>
//     );
// }



import './userprofile.component.css';
import up1 from '../../assets/images/upvarun.png';
import v1 from '../../assets/images/varun1.png';
import v2 from '../../assets/images/varun2.png';
import v3 from '../../assets/images/varun3.png';
import nopost1 from '../../assets/images/nopost.png';
import { BsGrid3X3 } from 'react-icons/bs';
import { NavBar } from '../navbar/navbar.component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getlocalstorageitem } from '../../services/storages/localstorage';
import { AuthRoute } from '../../services/authroute';
import { Link } from 'react-router-dom';

export function UserProfile() {
    const [posts, setposts] = useState([]);
    const [nopost, setnopost] = useState(false);
    const [userdata, setuserdata] = useState(null);
    const [profile, setprofile] = useState(null);
    const [profilepic, setprofilepic] = useState([]);

    useEffect(() => {
        console.log('Fetching userdata from local storage...');
        const data = getlocalstorageitem("userdata");
        console.log('Data from local storage:', data);
        if (data) {
            try {
                const userDataObject = JSON.parse(data);
                console.log('Parsed userdata:', userDataObject);
                setuserdata(userDataObject);
            } catch (error) {
                console.error('Error parsing userdata:', error);
            }
        }
    }, []);

    useEffect(() => {
        console.log('Userdata in state:', userdata);
        if (userdata && userdata.id) {
            const cid = userdata.id;
            console.log('CID:', cid);
            // Ensure that userdata contains the expected properties including id
            axios.get(`http://localhost:4200/getpostdata/${cid}`)
                .then((res) => {
                    setposts(res.data);
                    if (res.data.length > 0) {
                        setnopost(true);
                    } else {
                        setnopost(false);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching post data:', error);
                });
                // Fetch profile picture data
                // axios.get(http://localhost:4200/getprofilepicdata/${cid})
                //     .then((res) => {
                //         setprofilepic(res.data);
                //     })
                //     .catch((error) => {
                //         console.error('Error fetching profile picture data:', error);
                //     });
        }
    }, [userdata]);

    function getUser() {
        const data = localStorage.getItem("userdata");
        if (data) {
            const parsedData = JSON.parse(data);
            if (parsedData.length > 0) {
                setprofile(parsedData); // Set the user data
            } else {
                console.error("User data array is empty");
            }
        } else {
            console.error("User data not found in local storage");
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    useEffect(() => {
        console.log('Userdata in state:', userdata);
        if (userdata && userdata.id) {
            const cid = userdata.id;
            console.log('prfileid:', cid);
            // Ensure that userdata contains the expected properties including id
           
                // Fetch profile picture data
                axios.get(`http://localhost:4200/getprofilepicdata/${cid}`)
                    .then((res) => {
                        setprofilepic(res.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching profile picture data:', error);
                    });
        }
    }, [userdata]);


    

    return (
        <AuthRoute>
            <div>
                <NavBar></NavBar>
                {userdata && (
                    <>
                        <div className='upfront'>
                            <div>
                                {
                                    profilepic && profilepic.map((item)=>
                                        <img src={item.profilepic} className='userprofileimg' />
                                    )
                                }

                                <button className='addprofile'><Link to='/profilepic' className='link'>+</Link></button>
                            </div>
                            <div className='updetails'>
                                <div>
                                    <h2 className='pname'>{userdata.username}</h2>
                                    {/* Render other profile data as needed */}
                                </div>
                                <span className='upposts'>79 posts</span>
                                <span className='upposts'> 379 followers</span>
                                <span className='upposts'>179 following</span><br></br>
                                <h6>{userdata.userprofile}</h6>
                                <p className='paragraph'>Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony Alpha Ambassador OPPO </p>
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className='mobilefront'>
                            <h2 className='pname'>{userdata.username}</h2>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <img src={up1} className='userprofileimg' />
                                    <button className='addprofile'><Link to='/profilepic' className='link'>+</Link></button>
                                </div>
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
                            <h6 style={{ margin: 10 }}>{userdata.userprofile}</h6>
                            <p className='paragraph'>Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony Alpha Ambassador OPPO </p>
                        </div>
                        <img src={v1} className='varun1' />
                        <img src={v2} className='varun1' ></img>
                        <img src={v3} className='varun1' /> &nbsp;
                        <hr></hr>
                        <BsGrid3X3 className='gridicon' />
                        <span className='up-posts'><b>Posts</b> </span><br></br>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {nopost === true &&
                                posts && posts.map((item) =>
                                    <div key={item.id}>
                                        <img src={item.postimg} className='upostimg' />
                                    </div>
                                )
                            }
                            {
                                nopost === false && (
                                    <img src={nopost1} style={{ width: '100%', marginTop: 10 }} />
                                )
                            }
                        </div>
                    </>
                )}
            </div>
        </AuthRoute>
    );
}