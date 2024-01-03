import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import FavIcon from '../fav-icon/fav-icon';

const MovieCard = ({ movie, setUser }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.ImageURL} />
      <FavIcon MovieID={movie._id} setUser={setUser} style={{ marginTop: "10px", float: "right" }} />
      <Link to={'/'} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Title>{movie.Genre.Name}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="primary" size="sm">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
};

export default MovieCard;