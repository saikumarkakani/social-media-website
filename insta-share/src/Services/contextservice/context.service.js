import axios from "axios";

//function read
export function read(url,data){
    return axios.get(url,data);
}

//function save
export function create(url,data){
    return axios.post(url,data);
}
//function update
export function update(url,data){
    return axios.put(url,data);
}

//function delete
export function deleteData(url,data){
    return axios.delete(url,data)
}