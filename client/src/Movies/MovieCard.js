import React from 'react';
import styled from 'styled-components'

const Container = styled.div` 
  border: 2px solid grey;
  width: 50vw;
  font-family: 'Bangers', cursive;
  text-align:center;
  border-radius: 10px;
  :hover {
    box-shadow: 0 0 10px yellow;
  }
`

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <Container className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </Container>
  );
};

export default MovieCard;
