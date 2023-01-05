import { Button } from "bootstrap";
import { Modal } from "bootstrap";

export default function ShowAlert(props){
    return(
        <Modal
            {...props}
            size="sm"
            aria-labelledby = "contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title id = "contained-modal-title-vcenter">
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {props.msg}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={props.onSubmit}>Yes</Button>
                    <Button variant='danger' onClick={props.onHide}>No</Button>
                </Modal.Footer>
            </Modal>
    )
}