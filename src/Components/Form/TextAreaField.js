import { Form } from "react-bootstrap";
import React from "react";
export default function TextArea(props){
    return(
        <div>
            <Form.Label>Enter Description</Form.Label>
            <Form.Control id='description' type="text" placeholder="Enter film description"
            as="textarea" rows="3" name="description"
            onChange={props.saveDescription} value = {props.description}/>
        </div>
    )
}