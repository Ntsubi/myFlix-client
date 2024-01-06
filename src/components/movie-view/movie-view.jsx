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
        <h1 className="text-uppercase">{movie.Title}</h1>
      </div>
      <div>
        <p>{movie.Description}</p>
      </div>
      <div>
        <span><strong>Genre: </strong></span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span><strong>Director: </strong></span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span><strong>Director's Bio: </strong></span>
        <span>{movie.Director.Bio}</span>
      </div>
      <div>
        <span><strong>Runtime: </strong></span>
        <span>{movie.Runtime}</span>
      </div>
      <div>
        <span><strong>Release Year: </strong></span>
        <span>{movie.ReleaseYear} </span>
      </div>
      <div>
        <span><strong>Featured: </strong></span>
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