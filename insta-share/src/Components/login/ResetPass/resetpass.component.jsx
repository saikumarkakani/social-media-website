// import React, { useState } from 'react';
// import '../ResetPass/resetpass.component.css';
// import pic from '../../../Assests/instashare.png';
// import loginpic from '../../../Assests/login.png';
// import axios from 'axios';
// import { Link } from 'react-router-dom';


// export function ResetPass() {

//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleForgotPassword = async () => {
//         try {
//             let response = await axios.post('http://localhost:4003/forgotpassword', { email }); // Correct URL
//             setMessage(response.data.message);
//         } catch (error) {
//             console.error('Error during forgot password request:', error);
//             setMessage(error.response?.data?.message || 'An error occurred.');
//         }
//     };

//     return (
//         <div>
//             <div className="login-container" >
//                 <div>
//                     <img src={loginpic} alt="Login" />
//                 </div>
//                 <form className="login-centered-form" style={{height:"300px"}}>
//                     <div>
//                         <img src={pic} className='insta-share' alt="Insta Share" />
//                     </div>

//                     <div className='form-text-gap'>
//                         <div className='fname-gap'>EMAIL ID</div>
//                         <input
//                             type="mail"
//                             placeholder="Enter your Mail"
//                             value={email}
//                             onChange={(e)=> setEmail(e.target.value)}
//                             className='form-control input-name'/>
//                     </div>
//                     <div>
//                     <Link to='/login'><label className='back'>Back</label></Link>
//                 </div>

//                     <br></br>
//                     <button type="submit" className='Login-button' onClick={handleForgotPassword}>Reset</button>
//                     {message && <div><p className='reset-error'>{message}</p></div>}



//                 </form>

//             </div>
//         </div>
//     );
// }




import React, { useState } from 'react';
import '../ResetPass/resetpass.component.css';
import pic from '../../../Assests/instashare.png';
import loginpic from '../../../Assests/login.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function ResetPass() {
    const [showemailmsg, setshowemailmsg] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            let response = await axios.post('http://localhost:4003/forgotpassword', { email }); // Correct URL
            setMessage(response.data.message);
            setshowemailmsg(true); // Show message when email is sent
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Delay page reload by 1 second
        } catch (error) {
            console.error('Error during forgot password request:', error);
            setMessage(error.response?.data?.message || 'An error occurred.');
            setshowemailmsg(false); // Hide message on error
        }
    };

    return (
        <div>
            <div className="login-container">
                <div>
                    <img src={loginpic} alt="Login" />
                </div>
                <form className="login-centered-form" style={{ height: "300px" }} onSubmit={handleForgotPassword}>
                    <div>
                        <img src={pic} className='insta-share' alt="Insta Share" />
                    </div>
                    <div className='form-text-gap'>
                        <div className='fname-gap'>EMAIL ID</div>
                        <input
                            type="email"
                            placeholder="Enter your Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='form-control input-name'
                        />
                    </div>
                    <div>
                        <Link to='/login'><label className='back'>Back</label></Link>
                    </div>
                    <br />
                    <button type="submit" className='Login-button'>Reset</button>
                    {message && <div><p className='reset-error'>{message}</p></div>}
                </form>
            
            </div>
        </div>
    );
}
