import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  return (
    <div>
      <div>
        <img src={movie.ImageURL} className="W-50" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Director's Bio: </span>
        <span>{movie.Director.Bio}</span>
      </div>
      <div>
        <span>Runtime: </span>
        <span>{movie.Runtime}</span>
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.ReleaseYear} </span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured ? "Yes" : "No"}</span>
      </div>
      <Link to={`/`}>
        <Button variant="primary">Back</Button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.number,
      Death: PropTypes.number
    }),
    Runtime: PropTypes.string,
    ReleaseYear: PropTypes.number,
    Featured: PropTypes.bool
  }).isRequired,
};

export default MovieView;