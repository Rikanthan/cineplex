import { ToggleButton, Button, Modal, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

export default function ShowAlert(props) {

    const [radioValue, setRadioValue] = useState(1);
    const radios = [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 }
    ];

    function handle(e){ 
        setRadioValue(e.target.value)
        }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.msg}
                </p>
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={radioValue === ++idx ? 'success' : 'outline-success'}
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={handle}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={props.onSubmit}>Yes</Button>
                <Button variant='danger' onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}