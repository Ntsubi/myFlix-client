import React from "react";
import MovieCard from "../movie-card/movie-card";

const FavoriteMovies = ({ favoriteMovies }) => {

  return (
    <>
      <h4>Favorites</h4>
      {
        favoriteMovies.map(movie => {
          return <MovieCard movie={movie} />
        })
      }
    </>
  );

}


export default FavoriteMovies;
