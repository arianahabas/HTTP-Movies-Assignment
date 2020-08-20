import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import styled from 'styled-components'

const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
`;

const CenterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };


  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
// console.log(movie)

/////DELETE MOVIE ///////////////////
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res)=>{
      // console.log('it worked', res)
      getMovieList()
      history.push('/')
    })
    .catch((err)=>{
      console.log('fail', err)
    })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <CenterButton>
        <Button onClick={()=> history.push(`/update-movie/${movie.id}`)}>Edit</Button>
        <Button onClick={handleDelete} >Delete</Button>
      </CenterButton>
    </div>
  );
}

export default Movie;
