import { read } from "./contextservice/context.service";




const userUrl = "http://localhost:4003/getuserposts";


//create a function
export function getPoststory(){
    return read(userUrl);
}
