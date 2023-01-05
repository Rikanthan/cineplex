import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import FilmService from './Service/FilmService';
import { FilmContext } from './Context/FilmContext';
import { SeatContext } from './Context/SeatContext';
import NavigationBar from './Components/NavigationBar';
import { Route, Router, Routes } from 'react-router-dom';
import AddShow from './Components/Form/AddShowForm';
import ShowFilms from './Components/Theatre/ShowFilm';
import Seats from './Components/Theatre/Carousel';

function App() {
  const [films, setFilms] = useState([]);
  const [seats, setSeats] = useState([])
  useEffect(() => {
    async function getFilm() {
      await FilmService.getAllFilms()
        .then((res) => {
          if (res.status === 200) {
            setFilms(res.data)
          }
        })
    }
    getFilm()
  }, [])

  const dispatchFilmEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_FILM':
        setFilms([...films, payload.newFilm])
        return;
      case 'RESET':
        setFilms([])
        return;
      case 'SEARCH_FILM':
        setFilms([films.map(film => film.name === payload.filmName ? film : payload.backUpFilm)])
        return
      case 'UPDATE_FILM':
        setFilms(films.map(film => film.id === payload.filmId ? { ...payload.film } : film))
        return
      case 'DELETE_FILM':
        setFilms([films.filter(film => film.id !== payload.filmId)]);
        FilmService.getAllFilms().then((res) => {
          if (res.status == 200) {
            setFilms(res.data)
          }
        })
        return
      default:
        return
    }
  }

  const dispatchSeatEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_SEATS':
        setSeats(payload.newSeat)
        return
      case 'BOOK_FILM':
        setSeats(seats.map(seat => seat.key.showId === payload.seat.key.showId
          && seat.key.seatNo === payload.seat.key.seatNo ? { ...payload.seat } : seat))
        return
      default:
        return;
    }
  }

  return (
    <div className="App">
      <FilmContext.Provider value={{ films, dispatchFilmEvent }}>
        <SeatContext.Provider value={{ seats, dispatchSeatEvent }}>
          <header className="App-header">
            <NavigationBar url={logo} />
            <Router>
              <Routes>
                <Route path="/" exact element={
                  <AddShow />
                }></Route>
                <Route path="/films" element={<ShowFilms films={films}/>}>
                </Route>
                <Route path='/shows' element={<Seats film={films}/>}>
                </Route>
              </Routes>
            </Router>
          </header>
        </SeatContext.Provider>
      </FilmContext.Provider>
    </div>
  );
}

export default App;
