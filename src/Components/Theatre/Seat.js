import { Button } from "react-bootstrap";

export default function Seat({ seat,click }) {
    return (
        <div key={seat.key.seatNo} style={{ padding: 10 }}>
            <Button
                variant={seat.status ? 'success' : 'light'}
                onClick={click}
                >
                {seat.key.seatNo < 10 ? " " + seat.key.seatNo + " " : seat.key.seatNo + " "}
            </Button>
        </div>
    )
}
