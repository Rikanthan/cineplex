import { useCallback, useContext, useEffect, useState } from "react";
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
        let isCancelled = false;
        SeatService.getSeatsForSpecificShow(film.id)
            .then((res) => {
                if (res.status === 200 && !isCancelled) {
                    dispatchSeatEvent('ADD_SEATS', { newSeat: res.data });
                }
            })
        return () => { isCancelled = true }
    }, [film.id,dispatchSeatEvent])

    useEffect(() => {
        let isCancelled = false;
        SeatService.countAvailableSeats(film.id)
            .then((res) => {
                if (!isCancelled)
                    setCount(res.data)
            })
        return () => { isCancelled = true }
    }, [film.id])

    const seatClick = useCallback((element) => (e) => {
        e.preventDefault();
        console.log(element)
        setAlert(true)
        setSeatKey(element.key)
        setStatus(element.status)
    }, [])

    const hideAlert = useCallback(() => {
        setAlert(false)
    }, [])

    const confirm = useCallback(() => {
        if (!status) {
            console.log(seatKey)
            SeatService.bookSeat(seatKey).then((res) => {
                if (res.status === 200) {
                    setCount(--count)
                    dispatchSeatEvent('BOOK_FILM', { seat: res.data })
                }
            })
        } else {
            SeatService.cancelBooking(seatKey)
                .then((res) => {
                    if (res.status === 200) {
                        setCount(++count)
                        dispatchSeatEvent('BOOK_FILM', { seat: res.data })
                    }
                })
        }
        setAlert(false)
    }, [count,dispatchSeatEvent,seatKey,status])

    return (
        <div>
            <Form.Label>{film.name}</Form.Label>
            <Form.Label as="legend">{film.description}</Form.Label>
            <Form.Label as="legend">{DateService.formatDateTime(film.showDateTime)}</Form.Label>
            <Form.Label as="legend">Available Seats : {count}</Form.Label>
            <Row xs="5" className="justify-content-sm-center">
                {seats.map((element, index) => (
                    <Col key={element.id}>
                        <Seat
                            seat={element}
                            click={seatClick(element)}
                        />
                    </Col>
                ))
                }
            </Row>
            {
                alert ? <ShowAlert
                    show={alert}
                    onHide={hideAlert}
                    onSubmit={confirm}
                    msg={!status ? "Do you want to book this seat?" : "Do you want to cancel booking?"} /> : null
            }
        </div>
    )
}