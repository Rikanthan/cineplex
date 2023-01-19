import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FilmContext } from "../../Context/FilmContext";
import DateService from "../../Service/DateService";
import FilmService from "../../Service/FilmService";
import SeatService from "../../Service/SeatService";
import ShowAlert from "../AlertBox";
import UpdateShow from "./UpdateShow";

export default function Film({ film, onClick }) {
    const [count, setCount] = useState(0)
    const [alert, setAlert] = useState(false)
    const [update, setUpdate] = useState(false)
    const { dispatchFilmEvent } = useContext(FilmContext);
    useEffect(() => {
        let isCancelled = false;
        async function getAvailableSeats() {
            await SeatService.countAvailableSeats(film.id)
                .then((res) => {
                    if(res.status === 200 && !isCancelled ){
                        setCount(res.data)
                    }else{
                        console.log(res.data)
                    }
                }).catch((error) =>console.log(error))
                return()=>{
                    isCancelled = true;
                }
        }
        getAvailableSeats()
    }, [film.hideAlert])

    const hideAlert = useCallback(()=>{
        setAlert(false)
    },[])

    const clickEdit = useCallback(()=>{
        setUpdate(true)
    },[])

    const clickDelete = useCallback(()=>{
        setAlert(true)
    },[])

    const deleteFilm = useCallback(()=>{
        FilmService.deleteFilmById(film.id)
                    .then((res)=>{
                        if(res.status === 200){
                            dispatchFilmEvent('DELETE_FILM',{filmId: film.id})
                            toast.success("Film Deleted successfully!",{autoClose:600})
                        }
                        else{
                            toast.error("Film deleted failed!",{autoClose: 500})
                        }
               })
               setAlert(false)
    },[film.id])

    return (
        <div>
            <Card bg="light" border="primary" text="dark" style={{ margin: 10 }}>
                <Card.Header>{film.name}</Card.Header>
                <Card.Body>
                    <Card.Title>
                        {DateService.formatDateTime(film.showDateTime)}
                    </Card.Title>
                    <Card.Text>
                        {film.description}
                    </Card.Text>
                    <Card.Text>
                        Total Seats : {film.availableSeats}
                    </Card.Text>
                    <Card.Text>
                        Available Seats : {count}
                    </Card.Text>
                    <Button variant="dark" onClick={onClick}>View Seats</Button>
                    <Button variant="primary" onClick={clickEdit}>Edit</Button>
                    <Button variant="danger" onClick={clickDelete}>Delete</Button>
                </Card.Body>
            </Card>
            {alert ? <ShowAlert
               show = {alert}
               onHide = {hideAlert}
               onSubmit={deleteFilm}
            msg={"Do you want to delete this film?"}/>: null}
            {
                update ? <UpdateShow
                shw = {update}
                onHide = {hideAlert}
                props = {film}/> : null
            }
            <ToastContainer position="bottom-center"/>
        </div>
    )
}