import '../PageNotFound/Pagenotfound.component.css';
import page from'../../Assests/pagenotfound-removebg-preview.png';
import { Link } from 'react-router-dom';



export function PageNotFound(){
    return(
        <div>
            <img src={page} className='page-not'></img>
            <div className='pagenot-text'>Page Not Found</div>
            <div className='pagenot-Stext'>we are sorry, the page you requested could not be found.</div>
                <div className='pagenot-Stext1'>Please go back to the homepage.</div>
                <div  className='pagenot-btn'>
                   <Link to = '/home'><button className='btn btn-primary'>Home Page</button></Link>    
                </div>
        </div>
    )
}