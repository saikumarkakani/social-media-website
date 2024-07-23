// import '../Add-Posts/addpost.component.css';
// import pic from '../../Assests/instashare.png';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { getLocalStorageItem } from '../../Services/storages/local.storage';
// import { InstaNav } from '../Insta-NavBar/instanave.component';


// export function Addpost() {


//  //for show addpost msg
//  const [showaddpostmsg, setshowaddpostmsg] = useState(false);


//     const [userData, setuserData] = useState(null);

//     const [storyimg, setstoryimg] = useState();

//     const {
//         register,
//         handleSubmit
//     } = useForm();

//     useEffect(()=>{
//         const data  = getLocalStorageItem("userData");
//         setuserData(JSON.parse(data));
//     },[])

    


//        async function saveData(data){
//            let formData = new FormData();
   
//             formData.append("userid", userData[0]?.id);
//            formData.append("storyimg",storyimg)
//            formData.append("story", data.story);
           
   
//            const config = {
//                header: { "content-Type": "multipart/form-data" }
//            }
       
//            try {
//             const res = await axios.post("http://localhost:4003/savepoststory", formData, config);
           
//           } catch (error) {
//             console.error("Error adding product:", error);
//           }
//           window.location.reload();

//        }
   
//        function loadImages(event) {
//            var render = new FileReader();
//            render.onload= function () {
//                setstoryimg(render.result);
   
//            }
//            render.readAsDataURL(event.target.files[0]);
//        }
//     return (
//         <div>

//             <div className="addprofile-container">
//                 <form className="addprofile-centered-form" onSubmit={handleSubmit((data) => { saveData(data) })}>
//                     <div>
//                         <img src={pic} className='addinsta-share' alt="Insta Share" />
//                     </div>
//                     <div className='addform-text-gap'>
//                         <div className='addfname-profile'>Add to Post</div>
//                         <input type="file" id="profile-pic" className='addinput-profile' name="profile-pic"  {...register("storyimg")} onChange={(event) => { loadImages(event) }} />
//                     </div>
//                     <div>
//                         <div className='story'>Your Story</div>
//                         <input type="text" placeholder='write your story...🤩' className='addinput-story' {...register("story")}></input>

//                     </div>
//                     <br />
//                     <button type="submit"  className='addprofile-button' onClick={()=>{setshowaddpostmsg(true)}}>Upload</button>
//                 </form>
//             </div>
//             {showaddpostmsg && (
//                             <div className='Show-Msg'>
//                             <label style={{ marginLeft: "20px" }}>Your post is live. High-five! 🙌</label>
//                         </div>
//                         )}
//         </div>
//     );
// }



import '../Add-Posts/addpost.component.css';
import pic from '../../Assests/instashare.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { getLocalStorageItem } from '../../Services/storages/local.storage';
import { InstaNav } from '../Insta-NavBar/instanave.component';
import { Link } from 'react-router-dom';


export function Addpost() {


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
   
            formData.append("userid", userData[0]?.id);
           formData.append("storyimg",storyimg)
           formData.append("story", data.story);
           
   
           const config = {
               header: { "content-Type": "multipart/form-data" }
           }
       
           try {
            const res = await axios.post("http://localhost:4003/savepoststory", formData, config);
            window.location.reload();
          } catch (error) {
            console.error("Error adding product:", error);
          }

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
                <form className="addprofile-centered-form" onSubmit={handleSubmit((data) => { saveData(data) })}>
                    <div>
                        <img src={pic} className='addinsta-share' alt="Insta Share" />
                    </div>
                    <div className='addform-text-gap'>
                        <div className='addfname-profile'>Add to Post</div>
                        <input type="file" id="profile-pic" className='addinput-profile' name="profile-pic"  {...register("storyimg")} onChange={(event) => { loadImages(event) }} />
                    </div>
                    <div>
                        <div className='story'>Your Story</div>
                        <input type="text" placeholder='write your story...🤩' className='addinput-story' {...register("story")}></input>

                    </div>
                    <br />
                    <button type="submit"  className='addprofile-button' onClick={()=>{setshowaddpostmsg(true)}}>Upload</button>
                   <Link to="/userprofile"><button className='back-button'>Back</button></Link> 
                </form>
            </div>
            {showaddpostmsg && (
                            <div className='Show-Msg'>
                            <label style={{ marginLeft: "20px" }}>Your post is live. High-five! 🙌</label>
                        </div>
                        )}
        </div>
    );
}

