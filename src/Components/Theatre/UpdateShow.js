import { Button } from "bootstrap";
import { useContext, useState } from "react";
import { Form, Modal, ModalBody, ModalFooter, ToastHeader } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FilmContext } from "../../Context/FilmContext";
import { SeatContext } from "../../Context/SeatContext";
import DateService from "../../Service/DateService";
import FilmService from "../../Service/FilmService";
import SeatService from "../../Service/SeatService";
import CustomDatePicker from "../Form/DateTimePicker";
import TextField from "../Form/InputField";
import TextArea from "../Form/TextAreaField";

export default function UpdateShow({ props, shw, onHide }) {
    const [film, setFilm] = useState(
        {
            ...props, date: DateService.formatDate(props.showDateTime),
            time: DateService.formatTime(props.showDateTime)
        })

    const { dispatchFilmEvent } = useContext(FilmContext);
    const { dispatchSeatEvent } = useContext(SeatContext);
    const [show, setShow] = useState(shw);

    function submit(e) {
        FilmService.updateFilm(film)
            .then((res) => {
                setShow(false)
                if (res.status === 200) {
                    dispatchFilmEvent('UPDATE_FILM', { filmId: film.id, film: res.data })
                    SeatService.getSeatsForSpecificShow(film.id).then((res) => {
                        dispatchSeatEvent('ADD_SEAT', { newSeat: res.data })
                    })
                    toast.success("Film updated successfully", { autoClose: 600 })
                }
                else {
                    toast.error("Something went wrong", { autoClose: 600 })
                }
            })
    }
    function handle(e) {
        const newFilm = { ...film };
        newFilm[e.target.id] = e.target.value
        setFilm(newFilm)
    }
    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton={show}>
                    <Modal.Title id="contained-model-title-vcenter">
                        Edit Film Details
                    </Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form>
                        <TextField saveName={(e) => handle(e)} name={film.name} />
                        <TextArea saveDescription={(e) => handle(e)} description={film.description} />
                        <CustomDatePicker saveDate={(e) => handle(e)} date={film.date} time={film.time} />
                        <Form.Label>Enter total Seats</Form.Label>
                        <Form.Control id='availableSeats' type="number"
                            placeholder="Enter total seats"
                            min="10" max="30"
                            value={film.availableSeats}
                            onChange={(e) => handle(e)} />
                        <ToastContainer position="bottom-center" />
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => submit(e)}>Update</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}