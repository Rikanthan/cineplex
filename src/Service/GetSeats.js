import axios from "axios";
const url = "http://localhost:8080/api/v1/seat";

export default function GetSeats(showId){
    return axios.get(url+"?showId="+showId);
}