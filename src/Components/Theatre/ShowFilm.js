import { useState } from "react";
import { Form } from "react-bootstrap";
import Film from "./Film";
import SearchBar from "../SearchBar";
import Show from "./Shows";

export default function ShowFilms({films}){
    const [index, setIndex] = useState(-1);
    const [view, setView] = useState(false);
    const [name, setName] = useState('');
    const [start, setStart] = useState(true)
    const [filterResults, setFilteredResults] = useState([])
    const searchItems = (searchValue) => {
        setName(searchValue)
        if(name !== ''){
            const filterData = films.films((item) => {
                return Object.values(item).join('')
                    .toLowerCase().includes(name.toLowerCase())
            })
            setFilteredResults(filterData)
        }
        else if(name.length === 0){
            setFilteredResults(films)
        }
    }
    
    const check = () =>{
        films.filter(item => name.length > 0 && 
                        item.name.toLowerCase().includes(name.toLowerCase()))
                        .map((index) =>{
                            setStart(false)
                        })
                        return start;
    }
    return(
        <>
        {!view ? <SearchBar onSearch={(e) => {
            setName(e.target.value)
        }}/> : null}
        {!view && 
            films.filter(item => name.length > 0 && 
             item.name.toLowerCase()
             .includes(name.toLowerCase()))
             .map((element,indx) =>(
                <Film 
                film = {element}
                onClick={() => {
                    setView(true)
                    setIndex(indx)
                }}/>
             ))}
             {!view && !check ?
             <Form.Label as="legend"> No Films available</Form.Label> : null}
             {
                !view && name.length === 0 &&
                    films.map((element, indx) => (
                        <Film
                         film = {element}
                         onClick = {() => {
                            setView(true)
                            setIndex(indx)
                         }}
                         />
                    ))
             }
             {view && films.map((element, indx) => (
                index === indx ? 
                <Show
                 film = {element}/>
                 : null
             ))}
        </>
    )
}