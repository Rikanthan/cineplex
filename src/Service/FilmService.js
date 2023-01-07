import axios from "axios";
import DateService from "./DateService";
const url = "http://localhost:8080/api/v1/film"
 class FilmService{
    getAllFilms(){
        return axios.get(url)
    }

    getFilmForToday(){
        return axios.get(url+"/todayFilm");
    }

    getFilmById(id){
        return axios.get(url+"?id"+id);
    }

    getFilmByName(name){
        return axios.get(url+"/name?name="+name)
    }

    getFilmByDate(date){
        return axios.get(url+"/date?date="+date)
    }

    deleteFilmById(id){
        return axios.delete(url+"?id"+id);
    }

    addFilm(film){
        return axios.post(url,{
            availableSeats: film.availableSeats,
            description: film.description,
            name: film.name,
            showDateTime: film.date+ " "+film.time
        })
    }

    updateFilmSeats(film){
        return axios.put(url+`changeAvailableSeats?id=${film.id}&seats=${film.seats}`)
    }

    updateFilm(film){
        return axios.put(url,{
            availableSeats: film.availableSeats,
            description: film.description,
            id: Number(film.id),
            name: film.name,
            showDateTime: DateService.formatDateToSave(film.date+ " "+film.time)
        })
    }

}

export default new FilmService()