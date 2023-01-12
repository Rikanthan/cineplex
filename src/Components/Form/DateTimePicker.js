import React,{useState} from "react";
import { Form } from "react-bootstrap";
import DateService from "../../Service/DateService";
import BasicTimePicker from "./TimePicker";


export default function CustomDatePicker(props){
    const [value, setValue] = useState(null);
    return(
        <div>
            <Form.Group controlId="dob">
                <Form.Label>Select Date</Form.Label>
                <Form.Control id='date' type="date" name="showdate" placeholder="Show date"
                    onChange={props.saveDate} value={props.date}/>
                <Form.Label>Select Time</Form.Label>
                {/* <Form.Control id='time' formMethod="time" type="time" name="showtime" placeholder="Show time"
                    onChange={props.saveTime} value={props.time}/> */}
                    <div>
                    <BasicTimePicker value={value} onChange={((time)=>{
                        setValue(DateService.formatTime(time))
                        })}/>
                    </div>
                
            </Form.Group>
        </div>
    )
}