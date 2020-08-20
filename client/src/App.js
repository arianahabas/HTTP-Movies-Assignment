import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import { UpdateForm } from './components/UpdateForm'
import AddMovie from './components/AddMovie'
import styled from 'styled-components'

const Button = styled.button`
  background: black;
  color: white;
  border-radius: 7px;
  padding: 20px;
  margin: 10px;
  font-size: 16px;
  :disabled {
    opacity: 0.4;
  }
  :hover {
    box-shadow: 0 0 10px yellow;
  }
`;
const CenterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
   
    <>
    
      <SavedList list={savedList} />

      <Link to='/add-movie'>
        <CenterButton>
          <Button>Add New Movie To List</Button>
        </CenterButton>
      </Link>
     
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
      </Route>

      <Route path="/update-movie/:id">
        < UpdateForm />
      </Route>

      <Route path="/add-movie">
        < AddMovie getMovieList={getMovieList}/>
      </Route>

    </>
  );
};

export default App;
