import React from "react";
import MovieCard from "../movie-card/movie-card";

const FavoriteMovies = ({ favoriteMovies, setUser }) => {

  return (
    <>
      <h5>Favorites</h5>
      {
        favoriteMovies.map(movie => {
          return <MovieCard movie={movie} key={movie._id} setUser={setUser} />

        })
      }
    </>
  );

}


export default FavoriteMovies;
