

import '../Add-to-Storys/addtostory.component.css';
import pic from '../../Assests/instashare.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { getLocalStorageItem } from '../../Services/storages/local.storage';
import { InstaNav } from '../Insta-NavBar/instanave.component';
import { Link } from 'react-router-dom';


export function AddStory() {


 //for show addpost msg
 const [showaddpostmsg, setshowaddpostmsg] = useState(false);


    const [userData, setuserData] = useState(null);

    const [storyimg, setstoryimg] = useState();

    const {
        register,
        handleSubmit
    } = useForm();

    useEffect(()=>{
        const data  = getLocalStorageItem("userData");
        setuserData(JSON.parse(data));
    },[])

    


       async function saveData(data){
           let formData = new FormData();
   
            formData.append("cid", userData[0]?.id);
           formData.append("simg",storyimg)
        
           
   
           const config = {
               header: { "content-Type": "multipart/form-data" }
           }
       
           try {
            const res = await axios.post("http://localhost:4003/addstory", formData, config);
           
          } catch (error) {
            console.error("Error adding product:", error);
          }
          window.location.reload();

       }
   
       function loadImages(event) {
           var render = new FileReader();
           render.onload= function () {
               setstoryimg(render.result);
   
           }
           render.readAsDataURL(event.target.files[0]);
       }
    return (
        <div>

            <div className="addprofile-container">
                <form className="addprofile-centered-form" onSubmit={handleSubmit((data) => { saveData(data) })} style={{height:"450px"}}>
                    <div>
                        <img src={pic} className='addinsta-share' alt="Insta Share" />
                    </div>
                    <div className='addform-text-gap'>
                        <div className='addfname-profile'>Add to Story</div>
                        <input type="file" id="profile-pic" className='addinput-profile' name="profile-pic"  {...register("simg")} onChange={(event) => { loadImages(event) }} />
                    </div>
                    <br />
                    <button type="submit"  className='addprofile-button' onClick={()=>{setshowaddpostmsg(true)}}>Upload</button>
                   <Link to="/home"><button className='back-button'>Back</button></Link> 
                </form>
            </div>
            {showaddpostmsg && (
                            <div className='Show-Msg'>
                            <label style={{ marginLeft: "20px" }}>Your story is live. High-five! 🙌</label>
                        </div>
                        )}
        </div>
    );
}

