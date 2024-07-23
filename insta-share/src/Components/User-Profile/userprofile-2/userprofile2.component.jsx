import '../userprofile-2/userprofile2.component.css';
import userpic from '../../../Assests/up2-1.jpeg';
import profile2 from '../../../Assests/p22.png';
import { BiGrid } from 'react-icons/bi';
import pic from '../../../Assests/pp21.jpeg';
import pic1 from '../../../Assests/pp22.jpeg';
import pic2 from '../../../Assests/pp23.jpeg';
import pic3 from '../../../Assests/4.jpeg';
import pic4 from '../../../Assests/5.jpeg';
import pic5 from '../../../Assests/6.jpeg';
import pic6 from '../../../Assests/7.jpeg';
import pic7 from '../../../Assests/8.jpeg';
import pic8 from '../../../Assests/9.jpeg';
import pic9 from '../../../Assests/10.jpeg';
import pic10 from '../../../Assests/11.jpeg';
import pic11 from '../../../Assests/12.jpeg';
import { InstaNav } from '../../Insta-NavBar/instanave.component';


export function UserProfile2() {
    return (
        <div>
            <InstaNav></InstaNav>
            <div>
                <label className='Upro-gap-top2'>
                    <img src={userpic} className='user-profile2'></img>
                </label>
                <label>
                    <div className='Uprofile-text2'>Rahul</div>
                    <div className='P-text-Gap2'>
                        <label className='Uprofile-text-S2'>60 Posts</label>
                        <label className='Uprofile-text-S2' >200 Followers</label>
                        <label className='Uprofile-text-S2'>160 Following</label>
                    </div>
                    <div className='Uprofile-subtext2'>Rahul</div>
                    <div className='Uprofile-subtext12'>It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change. </div>
                </label>
            </div>
            <div>
                    <img className="user-P-round-image22 " src={profile2} alt="Image 3" />
        
                </div>
            <hr className='profile-line2'></hr>
            <div>
                <label><BiGrid className='userLogo2'></BiGrid></label>&nbsp;
                <label className='post-text2'>Posts</label>
            </div>
            <div className='UpicStyle2'>
                <div>
                    <img src={pic} className='Upic2'></img>
                </div>
                <div>
                    <img src={pic1} className='Upic2'></img>
                </div>
                <div>
                    <img src={pic2} className='Upic2'></img>
                </div>
            </div>
            <div className='UpicStyle2'>
                <div>
                    <img src={pic3} className='Upic2'></img>
                </div>
                <div>
                    <img src={pic4} className='Upic2'></img>
                </div>
                <div>
                    <img src={pic5} className='Upic2'></img>
                </div>
            </div>
            <div className='UpicStyle2'>
                <div>
                    <img src={pic6} className='Upic2'></img>
                </div>
                <div>
                    <img src={pic7} className='Upic2'></img>
                </div>
                <div>
                    <img src={pic8} className='Upic2'></img>
                </div>
            </div>
            <div className='UpicStyle2'>
                <div>
                    <img src={pic9} className='Upic2'></img>
                </div>
                <div>
                    <img src={pic10} className='Upic2'></img>
                </div>
                <div>
                    <img src={pic11} className='Upic2'></img>
                </div>
            </div>

        </div>
    );
}
































