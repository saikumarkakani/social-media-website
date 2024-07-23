


import React, { useState } from 'react';
import '../signup/signup.component.css';
import pic from '../../Assests/instashare.png';
import loginpic from '../../Assests/login.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';


export function Signup() {

     //for show addpost msg
 const [showmsg, setshowmsg] = useState(false);

    //const [profileimg, setprofileimg] = useState();

    const {
        register,
        handleSubmit
    } = useForm();

    async function saveData(data){
        let formData = new FormData();


        // formData.append("profileimg",profileimg);
        formData.append("email", data.email);
        formData.append("username", data.username);
        formData.append("password",data.password)


        const config = {
            header: { "content-Type": "multipart/form-data" }
        }

        try {
         const res = await axios.post("http://localhost:4003/savesignup", formData, config);

       } catch (error) {
         console.error("Error adding product:", error);
       }
       window.location.reload();

    }

    // function loadImages(event) {
    //     var render = new FileReader();
    //     render.onload= function () {
    //         setprofileimg(render.result);

    //     }
    //     render.readAsDataURL(event.target.files[0]);
    // }

    return (
        <div>
            <div className="signin-container">
                <div>
                    <img src={loginpic} alt="Login" />
                </div>
                <form className="signin-centered-form"  onSubmit={handleSubmit((data) => { saveData(data) })}  style={{ height: 'auto' }}>
                    <div>
                        <img src={pic} className='insta-share' alt="Insta Share" />
                    </div>

                    {/* <div className='form-text-gap'>
                        <div className='fname-gap-img'>UPLOAD PROFILE</div>
                        <input
                            type="file"
                            id="image"
                            className='form-control input-name-img'
                            {...register("profileimg")} onChange={(event) => { loadImages(event) }}
                        />
                    </div> */}
                    <div className='form-text-gap'>
                        <div className='fname-gap'>EMAIL ID</div>
                        <input
                            type="email"
                            id="mail"
                            placeholder="Enter Email"
                            className='form-control input-name'
                          {...register("email")}
                        />
                    </div>
                    <div>
                        <div className='fname-gap'>USER NAME</div>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            className='form-control input-name'
                            {...register("username")}
                        />
                    </div>
                    <div>
                        <div className='fname-gap'>PASSWORD</div>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            className='form-control input-name'
                            {...register("password")}
                        />
                    </div>
                    <br />
                    <button type="submit" className='Login-button' onClick={()=>{setshowmsg(true)}}>Sign Up</button>
                    <div className='sign-acc-gap'>
                        <label className='sign-acc'>Already have an account?</label>&nbsp;&nbsp; <Link to="/login"><label className='register'>Signin now</label> </Link>
                    </div>
                </form>
            </div>
            {showmsg && (
                            <div className='Show-Msg1'>
                            <label style={{ marginLeft: "20px" }}>You have successfully signed up. Welcome! 🌟</label>
                        </div>
                        )}
        </div>
    );
}

