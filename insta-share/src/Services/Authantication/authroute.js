import { Navigate } from "react-router-dom";
import { getLocalStorageItem } from "../storages/local.storage";



export function AuthRoute(props){
    let userValid = false;

    //check user

    userValid = getLocalStorageItem("userData");

    if(userValid){
        return props.children;
    }
    else{
        return <Navigate to="/login"></Navigate>
    }

}