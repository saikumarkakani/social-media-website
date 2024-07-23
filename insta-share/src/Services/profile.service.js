import { read } from "./contextservice/context.service";




const userUrl = "http://localhost:4003/searchprofile";

//create a function
export function getprofile(){
    return read(userUrl);
}
