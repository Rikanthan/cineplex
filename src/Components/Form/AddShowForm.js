import { useCallback, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FilmContext } from "../../Context/FilmContext";
 import  FilmService from "../../Service/FilmService";
import TextField from "./InputField";
import TextArea from "./TextAreaField";
import dayjs from 'dayjs';
import {Button, Form } from "react-bootstrap";
import BasicTimePicker from "./TimePicker";
export default function AddShow() {
    const [film, setFilm] = useState({
        availableSeats: "",
        description: "",
        name: "",
        showDateTime: dayjs('2023-01-13')
    });
    const { dispatchFilmEvent } = useContext(FilmContext);
    const submit = useCallback(()=>{
            FilmService.addFilm(film)
                .then((res) => {
                    if (res.status === 201) {
                        dispatchFilmEvent('ADD_FILM', { newFilm: film });
                        toast.success("New Show added successfully!", { autoClose: 600 });
                    }
                    else {
                        toast.error("Something went wrong", { autoClose: 600 })
                    }
                })
    },[film,dispatchFilmEvent]) 

    const handle = useCallback((e)=>{
        const newFilm = { ...film };
        newFilm[e.target.id] = e.target.value
        setFilm(newFilm)
    },[film])

    const dateOnChange = useCallback((event) => {
        const newFilm = {...film};
        newFilm["showDateTime"] = event
        setFilm(newFilm)
    },[film])



    return (
        <div>
            <Form className="mb-3">
                <TextField saveName={handle} name={film.name} />
                <TextArea saveDescription={handle} description={film.description} />
                <BasicTimePicker onChange={dateOnChange}/>    
                <Form.Label>Enter total Seats</Form.Label>
                <Form.Control id='availableSeats' type='number'
                    placeholder="Enter total seats" min="10" max="30" onChange={handle} />
                    <div style={{padding: 10}}>
                        <Button onClick={submit}>Submit</Button>
                    </div>
                    <ToastContainer position="bottom-center"/>
            </Form>
        </div>
    )
}