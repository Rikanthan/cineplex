import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FilmContext } from "../../Context/FilmContext";
 import  FilmService from "../../Service/FilmService";
import TextField from "./InputField";
import TextArea from "./TextAreaField";
import CustomDatePicker from "./DateTimePicker";
import {Button, Form } from "react-bootstrap";
export default function AddShow() {
    const [film, setFilm] = useState({
        availableSeats: "",
        description: "",
        name: "",
        date: "",
        time: ""
    });
    const { dispatchFilmEvent } = useContext(FilmContext);
    function submit(e) {
        FilmService.addFilm(film)
            .then((res) => {
                if (res.status === 201) {
                    dispatchFilmEvent('ADD_FILM', { newFilm: film });
                    toast.success("New Show added successfully!", { autoClose: 600 });
                }
                else {
                    toast.error("Somethine went wrong", { autoClose: 600 })
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
            <Form className="mb-3">
                <TextField saveName={(e) => handle(e)} name={film.name} />
                <TextArea saveDescription={(e) => handle(e)} description={film.description} />
                <CustomDatePicker saveDate={(e) => handle(e)} date={film.date}
                    saveTime={(e) => handle(e)} time={film.time} />
                <Form.Label>Enter total Seats</Form.Label>
                <Form.Control id='availableSeats' type='number'
                    placeholder="Enter total seats" min="10" max="30" onChange={(e) => handle(e)} />
                    <div style={{padding: 10}}>
                        <Button onClick={(e) => submit(e)}>Submit</Button>
                    </div>
                    <ToastContainer position="bottom-center"/>
            </Form>
        </div>
    )
}