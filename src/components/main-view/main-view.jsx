import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Django Unchained",
      Description: "German hunter Dr. King Schultz, along with Django, a slave, embarks on a mission to hunt the South's most wanted criminals. Their search brings them close to Django's long-lost wife.",
      Genre: {
        Name: "Drama",
        Description: "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone."
      },
      Director: {
        Name: "Quentin Tarantino",
        Bio: "Quentin Jerome Tarantino is an American film director, screenwriter, and actor. His films are characterized by stylized violence, extended dialogue including a pervasive use of profanity, and references to popular culture.",
        Birth: "March 27, 1963"
      },
      ImageURL: "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_FMjpg_UX1000_.jpg",
      Featured: true,
      Runtime: "165mins",
      ReleaseYear: 2012
    },
    {
      id: 2,
      Title: "Her",
      Description: "Theodore Twombly, an introverted writer, buys an Artificial Intelligence system to help him write. However, when he finds out about the AI's ability to learn and adapt, he falls in love with it.",
      Genre: {
        Name: "Drama",
        Description: "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone."
      },
      Director: {
        Name: "Spike Jonze",
        Bio: "Adam Spiegel, known professionally as Spike Jonze, is an American filmmaker, actor and photographer. His work includes films, commercials, music videos, skateboard videos and television.",
        Birth: "October 22, 1969"
      },
      ImageURL: "https://de.web.img2.acsta.net/pictures/14/01/21/17/18/048371.jpg",
      Featured: true,
      Runtime: "126mins",
      ReleaseYear: 2013
    },
    {
      id: 3,
      Title: "Dune",
      Description: "Paul Atreides arrives on Arrakis after his father accepts the stewardship of the dangerous planet. However, chaos ensues after a betrayal as forces clash to control melange, a precious resource.",
      Genre: {
        Name: "Sci-fi",
        Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs or dinosaurs."
      },
      Director: {
        Name: "Denis Villeneuve",
        Bio: "Denis Villeneuve OC CQ RCA is a Canadian filmmaker. He is a four-time recipient of the Canadian Screen Award for Best Direction, winning for Maelström in 2001, Polytechnique in 2009, Incendies in 2010 and Enemy in 2013.",
        Birth: "October 3, 1967"
      },
      ImageURL: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      Featured: true,
      Runtime: "155mins",
      ReleaseYear: 2021
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>This list is empty</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          );
        })}
      </div>
    );
  }
};
