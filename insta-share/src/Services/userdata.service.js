import { read } from "./contextservice/context.service";




const userUrl = "http://localhost:4003/getsignup";


//create a function
export function getuserdata(){
    return read(userUrl);
}
