
// import React, { useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../login/login.component.css';
// import pic from '../../Assests/instashare.png';
// import loginpic from '../../Assests/login.png';
// import { getuserdata } from '../../Services/userdata.service';
// import { setLocalStorageItem } from '../../Services/storages/local.storage';
// import store from '../../Services/ReduxStore/reduxstore.service';

// export function Login() {
//     const navigate = useNavigate();

//     // Ref variables
//     const usernameRef = useRef();
//     const passwordRef = useRef();

//     // State for error message
//     const [error, setError] = useState('');

//     function validateForm() {
//         const username = usernameRef.current.value;
//         const password = passwordRef.current.value;

//         if (!username || !password) {
//             setError('Please enter username and password');
//             return false;
//         }
//         setError('');
//         return true;
//     }

//     function getRegisterData(e) {
//         e.preventDefault();

//         if (!validateForm()) {
//             return;
//         }

//         const username = usernameRef.current.value;
//         const password = passwordRef.current.value;

//         getuserdata().then((res) => {
//             let filterData = res.data.filter((item) =>
//                 item.username === username && item.password === password
//             );

//             if (filterData.length > 0) {
//                 setLocalStorageItem("userData", filterData);
//                 let action = { type: "login", data: filterData };
//                 store.dispatch(action);
//                 alert("Login Successfully...");
//                 navigate("/home");
//             } else {
//                 alert("User Not Found...");
//             }
//         })
//             .catch((ex) => {
//                 alert(ex.message);
//             });
//     }

//     return (
//         <div className="login-container">
//             <div>
//                 <img src={loginpic} alt="Login" />
//             </div>
//             <form className="login-centered-form" onSubmit={getRegisterData} style={{ height: 'auto' }}>
//                 <div>
//                     <img src={pic} className='insta-share' alt="Insta Share" />
//                 </div>
//                 {error && (
//                     <div className="error-message">
//                         {error}
//                     </div>
//                 )}
//                 <div className='form-text-gap'>
//                     <div className='fname-gap'>USER NAME</div>
//                     <input
//                         type="text"
//                         id="username"
//                         placeholder="Enter Username"
//                         className='form-control input-name'
//                         ref={usernameRef}
//                     />
//                 </div>
//                 <div>
//                     <div className='fname-gap'>PASSWORD</div>
//                     <input
//                         type="password"
//                         id="password"
//                         placeholder="Enter password"
//                         className='form-control input-name'
//                         ref={passwordRef}
//                     />
//                 </div>
//                 <div>
//                     <Link to='/reset'><label className='forgot'>Forgot Password?</label></Link>
//                 </div>
//                 <br></br>
//                 <button type="submit" className='Login-button'>Login</button>
//                 <div className='log-acc-gap'>
//                     <label className='acc'>Don't have an account?</label>&nbsp;&nbsp;
//                     <Link to='/signup'>
//                         <label className='register'>Signup now</label>
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// }





import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/login.component.css';
import pic from '../../Assests/instashare.png';
import loginpic from '../../Assests/login.png';
import { getuserdata } from '../../Services/userdata.service';
import { setLocalStorageItem } from '../../Services/storages/local.storage';
import store from '../../Services/ReduxStore/reduxstore.service';

export function Login() {
    const navigate = useNavigate();

    // Ref variables
    const usernameRef = useRef();
    const passwordRef = useRef();

    // State for error message and loading spinner
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function validateForm() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            setError('Please enter username and password☹️');
            return false;
        }
        setError('');
        return true;
    }

    function getRegisterData(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        setLoading(true); // Show spinner

        getuserdata().then((res) => {
            let filterData = res.data.filter((item) =>
                item.username === username && item.password === password
            );

            if (filterData.length > 0) {
                setLocalStorageItem("userData", filterData);
                let action = { type: "login", data: filterData };
                store.dispatch(action);
                alert("Login Successfully...");
                navigate("/home");
            } else {
                alert("User Not Found...");
            }
        })
            .catch((ex) => {
                alert(ex.message);
            })
            .finally(() => {
                setLoading(false); // Hide spinner
            });
    }

    return (
        <div className="login-container">
            {loading && (
                <div className="spinner-container">
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div>
            )}
            {!loading && (
                <>
                    <div>
                        <img src={loginpic} alt="Login" />
                    </div>
                    <form className="login-centered-form" onSubmit={getRegisterData} style={{ height: 'auto' }}>
                        <div>
                            <img src={pic} className='insta-share' alt="Insta Share" />
                        </div>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        <div className='form-text-gap'>
                            <div className='fname-gap'>USER NAME</div>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter Username"
                                className='form-control input-name'
                                ref={usernameRef}
                            />
                        </div>
                        <div>
                            <div className='fname-gap'>PASSWORD</div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                className='form-control input-name'
                                ref={passwordRef}
                            />
                        </div>
                        <div>
                            <Link to='/reset'><label className='forgot'>Forgot Password?</label></Link>
                        </div>
                        <br></br>
                        <button type="submit" className='Login-button'>Login</button>
                        <div className='log-acc-gap'>
                            <label className='acc'>Don't have an account?</label>&nbsp;&nbsp;
                            <Link to='/signup'>
                                <label className='register'>Signup now</label>
                            </Link>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
