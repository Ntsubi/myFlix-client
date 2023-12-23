import React from "react";
import MovieCard from "../movie-card/movie-card";

const FavoriteMovies = ({ favoriteMovies }) => {

  return (
    <>
      <h5>Favorites</h5>
      {
        favoriteMovies.map(movie => {
          return <MovieCard movie={movie} key={movie._id} />

        })
      }
    </>
  );

}


export default FavoriteMovies;
