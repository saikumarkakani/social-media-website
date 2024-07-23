import React, { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../popup-profile-update/popup.css';
import { getLocalStorageItem } from '../../../../Services/storages/local.storage';

export function AddProfilePopup({ handleClose }) {



     //for show addpost msg
 const [showaddpostmsg, setshowaddpostmsg] = useState(false);
    const [userData, setUserData] = useState(null);
    const [profileImage, setProfileImage] = useState();

    const {
        register,
        handleSubmit
    } = useForm();

    useEffect(() => {
        const data = getLocalStorageItem("userData");
        setUserData(JSON.parse(data));
    }, []);

    async function saveData(data) {
        let formData = new FormData();
        formData.append("profileid", userData[0]?.id);
        formData.append("profileimage", profileImage);
    
        try {
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            const res = await axios.post("http://localhost:4003/saveuserprofile", formData, config);
            console.log("Response:", res.data);
            handleClose(); // Close the popup after successful upload
        } catch (error) {
            console.error("Error uploading profile image:", error);
            // Handle error here
        }
        window.location.reload();
    }
    

    function loadImages(event) {
        var render = new FileReader();
        render.onload = function () {
            setProfileImage(render.result);
        };
        render.readAsDataURL(event.target.files[0]);
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <span className="close-btn" onClick={handleClose}><MdCancel /></span>
                <form onSubmit={handleSubmit((data) => { saveData(data) })}>
                    <div className='updateform-text-gap'>
                        <div className='updatepro-text'>Upload Profile</div>
                        <input
                            type="file"
                            id="profile-pic"
                            className='updateinput-profile'
                            name="profileimage"
                            {...register("profileimage")}
                            onChange={loadImages}
                        />
                    </div>
                    <button type="submit" className='updatepro-btn' onClick={()=>{setshowaddpostmsg(true)}}>Upload</button>
                </form>
            </div>
            {showaddpostmsg && (
                            <div className='Show-Msg'>
                            <label style={{ marginLeft: "20px" }}>Your profile is live. High-five! 🙌</label>
                        </div>
                        )}
        </div>
    );
}
