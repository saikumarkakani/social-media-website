

import React, { useState, useEffect } from 'react';
import { AuthRoute } from "../Services/Authantication/authroute";
import { InstaHome } from "./Home-Insta/instahome.component";
import { HomeSliders } from "./Insta-NavBar/Home-Sliders/sliders.component";
import { InstaNav } from "./Insta-NavBar/instanave.component";
import { useNavigate } from 'react-router-dom';

export function Home() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate a delay to show the spinner
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <AuthRoute>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div>
            ) : (
                <div>
                    <InstaNav />
                    <HomeSliders />
                    <InstaHome />
                </div>
            )}
        </AuthRoute>
    )
}




