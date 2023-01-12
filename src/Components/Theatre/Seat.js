import { Button } from "react-bootstrap";

export default function Seat({ seat }) {
    return (
        <div key={seat.key.seatNo} style={{ padding: 10 }}>
            <Button
                variant={seat.status ? 'success' : 'light'}
                >
                {seat.key.seatNo < 10 ? " " + seat.key.seatNo + " " : seat.key.seatNo + " "}
            </Button>
        </div>
    )
}
