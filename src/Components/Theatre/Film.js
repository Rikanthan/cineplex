import { useContext, useEffect, useState } from "react";
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
        async function getAvailableSeats() {
            await SeatService.countAvailableSeats(film.id)
                .then((res) => {
                    setCount(res.data)
                })
        }
        getAvailableSeats()
    }, [])
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
                    <Button variant="primary" onClick={() => { setUpdate(true) }}>Edit</Button>
                    <Button variant="danger" onClick={() => { setAlert(true) }}>Delete</Button>
                </Card.Body>
            </Card>
            {alert ? <ShowAlert
               show = {alert}
               onHide = {() => setAlert(false)}
               onSubmit={()=> {
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
            }}
            msg={"Do you want to delete this film?"}/>: null}
            {
                update ? <UpdateShow
                shw = {update}
                onHide = {()=> {setUpdate(false)}}
                props = {film}/> : null
            }
            <ToastContainer position="bottom-center"/>
        </div>
    )
}