
import { useContext, useEffect, useRef, useState } from 'react';
import '../Insta-NavBar/instanave.component.css';
import { Link, useNavigate } from 'react-router-dom';
import instapic from '../../Assests/instashare1-removebg-preview.png';
import { IoIosSearch } from "react-icons/io";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getLocalStorageItem, removeLocalStorageItem } from '../../Services/storages/local.storage';
import store from '../../Services/ReduxStore/reduxstore.service';
import axios from 'axios';
import notfound from '../../Assests/notfound-removebg-preview.png';
import { Button, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { SearchContext } from '../../Services/contextservice/searchprocontext';

export function InstaNav() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state for spinner
    const [searchError, setSearchError] = useState(false); // State for search error
    const isUserRef = useRef(true);
    const searchPostsRef = useRef();
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    //for navbar sticky
    const [isSticky, setIsSticky] = useState(false);
    const navRef = useRef(null);

    //for Sticky Navbar
    const handleScroll = () => {
        if (navRef.current) {
            const offsetTop = navRef.current.offsetTop;
            setIsSticky(window.scrollY > offsetTop);
        }
    };




    useEffect(() => {
        isUserRef.current = true;
        const data = getLocalStorageItem("userData");
        if (data && isUserRef.current) {
            setIsUserLoggedIn(JSON.parse(data));
        }
        return () => {
            isUserRef.current = false;
        };
    }, [isUserLoggedIn]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // for search posts
    async function searchPostsData() {
        setLoading(true); // Show spinner
        setSearchError(false); // Reset search error state
        let formData = new FormData();
        formData.append("username", searchPostsRef.current.value);
        const config = {
            headers: { "content-Type": "multipart/form-data" }
        }

        setTimeout(async () => {
            try {
                const res = await axios.post("http://localhost:4003/searchPosts", formData, config);
                if (res.data.length === 0) {
                    setSearchError(true); // Set search error state if no results found
                } else {
                    store.dispatch({ type: "posts", data: res.data });
                }
            } catch (error) {
                console.error("Error searching posts:", error);
                setSearchError(true); // Set search error state if error occurs
            } finally {
                setLoading(false); // Hide spinner
            }
        }, 1000); // 10 seconds delay
    }

    const userLogOut = () => {
        removeLocalStorageItem("userData");
        setIsUserLoggedIn(null);
        if (isUserRef.current) {
            navigate("/");
        }
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <div className={`nav-bot fixed-container ${isSticky ? 'sticky' : ''}`} ref={navRef}>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>
                            <label>
                                <img src={instapic} className='Nav-insta-pic' alt="Insta Share" />
                            </label>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link>
                                    {/* <label>
                                        <input
                                            type='text'
                                            placeholder='Search for caption...'
                                            className='Search-for'
                                            ref={searchPostsRef}
                                        />
                                        <IoIosSearch
                                            className='search-style'
                                            onClick={searchPostsData}
                                        />
                                    </label> */}
                                    <label>
                                        <input
                                            type='text'
                                            placeholder='Search for caption...'
                                            className='Search-for'
                                            value={searchTerm}
                                            onChange={handleChange}
                                        />
                                        <IoIosSearch
                                            className='search-style'
                                            onClick={() => { navigate("/show") }}
                                        />
                                    </label>

                                    {/* <Form className="d-flex">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleChange}
                                            placeholder="Search usernames..."
                                        />
                                        <Button variant="outline-success" onClick={() => { navigate("/show") }}><Search ></Search></Button>
                                    </Form> */}



                                </Nav.Link>
                                <Nav.Link>
                                    <Link to='/home'>
                                        <label className='homegap'>Home</label>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to='/story'>
                                        <label className='hgap'>story</label>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/userprofile" style={{ textDecoration: 'none', color: "black" }}>
                                        <label className='hgap'>Profile</label>
                                    </Link>
                                </Nav.Link>&nbsp;&nbsp;
                                <label className='hgap'>
                                    <button className='hbutton' onClick={userLogOut}>Logout</button>
                                </label>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {loading && (
                    <div className="spinner-container">
                        <div className="spinner-border text-primary" role="status">
                        </div>
                    </div>
                )}
                {searchError && (
                    <div className="search-error">
                        <img src={notfound} className='notfound-img' alt="Not Found" />
                    </div>
                )}
            </div>
        </div>
    );
}







