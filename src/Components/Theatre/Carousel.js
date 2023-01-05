import { Carousel } from "react-bootstrap";
import Show from "./Shows";

export default function Seats({film}){
    return(
        <div>
            <Carousel>
                {film.map(element => (
                    <Carousel.Item>
                        <Show 
                        film={element}/>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}