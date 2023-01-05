import axios from "axios";
const url = "http://localhost:8080/api/v1/seats";
export default new class SeatService{
    getSeatsForSpecificShow(showId){
        return axios.get(url+"?showId="+showId);
    }
    bookSeat(seat){
        return axios.put(url+`/booking?showId=${seat.showId}&seatNo=&{seat.seatNo}`);
    }
    cancelBooking(seat){
        return axios.put(url+`/cancelBooking?showId=${seat.showId}&seatNo=${seat.seatNo}`)
    }
    countAvailableSeats(showId){
        return axios.get(url+`/availableSeats?showId=${showId}`)
    }
}