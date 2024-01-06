import React from "react";
import MovieCard from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FavoriteMovies = ({ favoriteMovies, setUser }) => {

  return (
    <>
      <Row>
        <Col xs={12}>
          <h5>Favorites</h5>
        </Col>
      </Row>
      <Row>
        {
          favoriteMovies.map(movie => {
            return <Col xs={12} md={6}> <MovieCard movie={movie} key={movie._id} setUser={setUser} />
            </Col>
          })
        }
      </Row>
    </>
  );

}


export default FavoriteMovies;
