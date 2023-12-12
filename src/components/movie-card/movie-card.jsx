import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

MovieCard.propTypes = {
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
  onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;