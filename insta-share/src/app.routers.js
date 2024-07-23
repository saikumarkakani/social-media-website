import { Route, Routes } from "react-router-dom";
import { Signup } from "./Components/signup/signup.component";
import { Login } from "./Components/login/login.component";
import {InstaHome } from "./Components/Home-Insta/instahome.component";
import { UserProfile } from "./Components/User-Profile/userprofile.component";
import { Home } from "./Components/home.component";
import { ResetPass } from "./Components/login/ResetPass/resetpass.component";
import { Addpost } from "./Components/Add-Posts/addpost.component";
import { PageNotFound } from "./Components/PageNotFound/Pagenotfound.component";

import { AddStory } from "./Components/Add-to-Storys/addtostory.component";


import Show from "./Components/searchUserprofiles/Search.Component";
import { CustomerProfile } from "./Components/searchUserprofiles/customerprofile.component";





export function AppRoutes(){
    return(
        <Routes>
                <Route path='/' element={<Login></Login>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/addpost' element={<Addpost></Addpost>}></Route>
            <Route path='/instahome' element={<InstaHome></InstaHome>}></Route>
            <Route path='/userprofile' element={<UserProfile></UserProfile>}></Route>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/story' element={<AddStory></AddStory>}></Route>
            <Route path='/reset' element={<ResetPass></ResetPass>}></Route>
            <Route path='/show' element={<Show></Show>}></Route>
            <Route path='/searchPro/:id' element={<CustomerProfile></CustomerProfile>}></Route>

              {/* Catch-all route for unmatched paths */}
              <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
            
        </Routes>
    )
}