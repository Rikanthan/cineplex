import { Button } from "bootstrap";

export default function Seat({ seat, click, prop }) {
    return (
        <div key={prop} style={{ padding: 10 }}>
            <Button
                variant={seat.status ? 'success' : 'light'}
                onClick={click}>
                {seat.key.seatNo < 10 ? " " + seat.key.seatNo + " " : seat.key.seatNo + " "}
            </Button>
        </div>
    )
}