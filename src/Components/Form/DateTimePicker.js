import React from "react";
import { Form } from "react-bootstrap";

export default function CustomDatePicker(props){
    return(
        <div>
            <Form.Group controlId="dob">
                <Form.Label>Select Date</Form.Label>
                <Form.Control id='date' type="date" name="showdate" placeholder="Show date"
                    onChange={props.saveDate} value={props.date}/>
                <Form.Label>Select Time</Form.Label>
                <Form.Control id='time' type="time" name="showtime" placeholder="Show time"
                    onChange={props.saveTime} value={props.time}/>
            </Form.Group>
        </div>
    )
}