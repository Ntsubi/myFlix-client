export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImageURL} />
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};