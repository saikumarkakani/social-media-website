


// import '../Home-Insta/instahome.component.css';
// import React, { useEffect, useState } from 'react';
// import up from '../../Assests/upg.jpeg';
// import { FaRegComment } from "react-icons/fa";
// import { IoShareSocialSharp } from "react-icons/io5";
// import { getPoststory } from '../../Services/instaStory.service';
// import store from '../../Services/ReduxStore/reduxstore.service';
// import { getprofile } from '../../Services/profile.service';

// export function InstaHome() {
//     const [instastory, setInstastory] = useState([]);
//     const [likeStatus, setLikeStatus] = useState([]);
//     const [loading, setLoading] = useState(true); // Loading state for spinner


//     useEffect(() => {
//         const fetchStories = async () => {
//             setLoading(true);
//             try {
//                 const res = await getPoststory();
//                 const stories = res.data;
//                 setInstastory(stories);
//                 setLikeStatus(stories.map(() => ({ liked: false, likeCount: 1456 })));
//             } catch (error) {
//                 console.error("Error fetching stories:", error);
//             } finally {
//                 setTimeout(() => {
//                     setLoading(false); // Hide spinner after 10 seconds
//                 }, 100);
//             }
//         };
//         getprofile().then((res)=>{
//             setInstastory(res.data);
//         })

//         fetchStories();

//         const unsubscribe = store.subscribe(() => {
//             const posts = store.getState().posts;
//             setInstastory(posts);
//         });

//         return () => unsubscribe();
//     }, []);

//     const handleLikeClick = (index) => {
//         setLikeStatus(prevStatus => {
//             const newStatus = [...prevStatus];
//             const isLiked = newStatus[index].liked;
//             newStatus[index] = {
//                 liked: !isLiked,
//                 likeCount: isLiked ? newStatus[index].likeCount - 1 : newStatus[index].likeCount + 1
//             };
//             return newStatus;
//         });
//     };



//     return (
//         <div>
//             {loading ? (
//                 <div className="spinner-container">
//                     <div className="spinner-border text-primary" role="status">

//                     </div>
//                 </div>
//             ) : (
//                 <>
//                     <br />
//                     <br />
//                     <div className='Bbody'>
//                         <div>
//                             {instastory && instastory.map((item, index) => (
//                                 <div key={index} className="story-box">
//                                     <div className="story-header">
//                                         {item.profileimg ? (
//                                             <img src={item.profileimage} alt="Profile Image" className="p-image" />
//                                         ) : (
//                                             <img src={up} alt="Profile" className="p-image" /> // Fallback image
//                                         )}

//                                         <span className="p-name">{item.username}</span>
//                                     </div>
//                                     <div className="story-body">
//                                         {item.storyimg && <img src={item.storyimg} alt="Story Image" className="story-image" />}
//                                     </div>
//                                     <div className="story-footer">
//                                         <span className="footer-content">
//                                             <span
//                                                 className={`heart-icon ${likeStatus[index]?.liked ? 'liked' : ''}`}
//                                                 onClick={() => handleLikeClick(index)}
//                                             >
//                                                 &#9829;
//                                             </span>
//                                             <span><FaRegComment className='story-icons' /></span>&nbsp;&nbsp;
//                                             <span><IoShareSocialSharp className='story-icons1' /></span>
//                                         </span>
//                                         <div className='likes'>
//                                             {likeStatus[index]?.likeCount} Likes
//                                         </div>
//                                         <div className='like-text1'>{item.story}</div>
//                                         <div className='like-text'><b>Bessie Cooper </b>so nice we are bringing our memories back </div>
//                                         <div className='like-text'><b>Esther Howard </b>my favourite spot </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <label style={{ marginBottom: "190px" }}></label>
//                 </>
//             )}
//         </div>
//     );
// }





import '../Home-Insta/instahome.component.css';
import React, { useEffect, useState } from 'react';
import up from '../../Assests/noprofile.jpg';
import { FaRegComment } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { getPoststory } from '../../Services/instaStory.service';
import store from '../../Services/ReduxStore/reduxstore.service';

export function InstaHome() {
    const [instastory, setInstastory] = useState([]);
    const [likeStatus, setLikeStatus] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state for spinner

    useEffect(() => {
        const fetchStories = async () => {
            setLoading(true);
            try {
                const res = await getPoststory();
                const stories = res.data;
                setInstastory(stories);
                setLikeStatus(stories.map(() => ({ liked: false, likeCount: 1456 })));
            } catch (error) {
                console.error("Error fetching stories:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false); // Hide spinner after 10 seconds
                }, 1000); // Increased timeout for demonstration purposes
            }
        };

        fetchStories();

        const unsubscribe = store.subscribe(() => {
            const posts = store.getState().posts;
            setInstastory(posts);
        });

        return () => unsubscribe();
    }, []);

    const handleLikeClick = (index) => {
        setLikeStatus(prevStatus => {
            const newStatus = [...prevStatus];
            const isLiked = newStatus[index].liked;
            newStatus[index] = {
                liked: !isLiked,
                likeCount: isLiked ? newStatus[index].likeCount - 1 : newStatus[index].likeCount + 1
            };
            return newStatus;
        });
    };

    return (
        <div>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <>
                    <br />
                    <br />
                    <div className='Bbody'>
                        <div>
                            {instastory && instastory.map((item, index) => (
                                <div key={index} className="story-box">
                                    <div className="story-header">
                                        {item.profileimage ? (
                                            <img src={item.profileimage} alt="Profile Image" className="p-image" />
                                        ) : (
                                            <img src={up} alt="Profile" className="p-image" /> // Fallback image
                                        )}

                                        <span className="p-name">{item.username}</span>
                                    </div>
                                    <div className="story-body">
                                        {item.storyimg && <img src={item.storyimg} alt="Story Image" className="story-image" />}
                                    </div>
                                    <div className="story-footer">
                                        <span className="footer-content">
                                            <span
                                                className={`heart-icon ${likeStatus[index]?.liked ? 'liked' : ''}`}
                                                onClick={() => handleLikeClick(index)}
                                            >
                                                &#9829;
                                            </span>
                                            <span><FaRegComment className='story-icons' /></span>&nbsp;&nbsp;
                                            <span><IoShareSocialSharp className='story-icons1' /></span>
                                        </span>
                                        <div className='likes'>
                                            {likeStatus[index]?.likeCount} Likes
                                        </div>
                                        <div className='like-text1'>{item.story}</div>
                                        <div className='like-text'><b>Bessie Cooper </b>so nice we are bringing our memories back </div>
                                        <div className='like-text'><b>Esther Howard </b>my favourite spot </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <label style={{ marginBottom: "190px" }}></label>
                </>
            )}
        </div>
    );
}
