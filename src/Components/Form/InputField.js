import { Form } from "react-bootstrap";
import React from "react";
export default function TextField(props){
    return(
        <div>
            <Form.Label>Enter Film name</Form.Label>
            <Form.Control className="mb-3" id='name' type="text" placeholder="Enter film name"
            onChange={props.saveName} value = {props.name}/>
        </div>
    )
}