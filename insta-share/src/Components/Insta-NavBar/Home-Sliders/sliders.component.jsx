

import Slider from 'react-slick';
import '../Home-Sliders/sliders.component.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function HomeSliders() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 9,
        slidesToScroll: 9,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const [profilepic, setProfilepic] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4003/getallstories')
            .then((res) => {
                setProfilepic(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch((error) => {
                console.error('Error fetching stories:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div>
            <Slider {...settings}>
                {profilepic.map((profile, index) => (
                    <div key={index} className='profileGap'>
                        <img className="round-image" src={profile.simg} alt={`Image ${index + 1}`} />
                        <div className='ptext'>{profile.username}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow next-arrow`}
            style={{ ...style }}
            onClick={onClick}
        >
            &#x276F;
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow prev-arrow`}
            style={{ ...style }}
            onClick={onClick}
        >
            &#x276E;
        </div>
    );
}
