import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { SeatContext } from "../../Context/SeatContext";
import DateService from "../../Service/DateService";
import SeatService from "../../Service/SeatService";
import ShowAlert from "../AlertBox";
import Seat from "./Seat";

export default function Show({ film }) {
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState(false);
    let [count, setCount] = useState(0);
    const [seatKey, setSeatKey] = useState([]);
    const { seats, dispatchSeatEvent } = useContext(SeatContext);
    useEffect(() => {
        async function getFilm() {
            await SeatService.getSeatsForSpecificShow(film.id)
                .then((res) => {
                    if (res.status === 200) {
                        dispatchSeatEvent('ADD_SEATS', { newSeat: res.data });
                    }
                })
        }
        getFilm()
    }, [])

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
            <Form.Label>{film.name}</Form.Label>
            <Form.Label as="legend">{film.description}</Form.Label>
            <Form.Label as="legend">{DateService.formatDateTime(film.showDateTime)}</Form.Label>
            <Form.Label as="legend">Available Seats : {count}</Form.Label>
            <Row xs="5" className="justify-content-sm-center">
                {seats.map((element, index) => (
                    <Col>
                        <Seat prop={index}
                            seat={element}
                            click={(e) => {
                                setAlert(true)
                                setSeatKey(element.key)
                                setStatus(element.status)
                            }}
                        />
                    </Col>
                ))
                }
            </Row>
            {
                alert ? <ShowAlert
                show = {alert}
                onHide = {() => setAlert(false)}
                onSubmit = {() => {
                    if(!status){
                        SeatService.bookSeat(seatKey).then((res) => {
                            if (res.status === 200){
                                setCount(--count)
                                dispatchSeatEvent('BOOK_FILM', {seat : res.data})
                            }
                        })
                    } else {
                        SeatService.cancelBooking(seatKey)
                        .then((res) => {
                            if (res.status === 200){
                                setCount(++count)
                                dispatchSeatEvent('BOOK_FILM', {seat : res.data})
                            }
                        })
                    }
                    setAlert(false)
                }}
               msg ={!status ? "Do you want to book this seat?" : "Do you want to cancel booking?"} />: null
            }
        </div>
    )
}