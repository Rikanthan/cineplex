import axios from "axios";
const url = "http://localhost:8080/api/v1/seat";
class SeatService{
    
    bookSeat(seat){
        return axios.put(url+`/booking?showId=${seat.showId}&seatNo=${seat.seatNo}`
        ,{ headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
         } });
    }
    cancelBooking(seat){
        return axios.put(url+`/cancelBooking?showId=${seat.showId}&seatNo=${seat.seatNo}`)
    }
    countAvailableSeats(showId){
        return axios.get(url+"/availableSeats?showId="+showId,{
            headers: {"Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json,text/plain',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"}
    })
    }
    getSeatsForSpecificShow(showId){
        return axios.get(url+"?showId="+showId);
    }
}
export default new SeatService()