import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    //This ensures nothing is fetched when no token is present
    if (!token) {
      return;
    }
    fetch('https://render-movie-api.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          console.log('Token is invalid or expired');
          res.status(401).send('Authentication failed. Please log in again.');
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            ImageURL: movie.ImageURL,
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
            },
            Runtime: movie.Runtime,
            ReleaseYear: movie.ReleaseYear,
            Featured: movie.Featured
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8} >
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} style={{ border: "1px solid green" }} />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col key={movie._id} md={3} >
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
        <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
      </Row>
    </Container>
  );
};

//   if (!user) {
//     return (
//       <>
//         <LoginView onLoggedIn={(user, token) => {
//           setUser(user);
//           setToken(token);
//         }} />
//         or
//         <SignupView />
//       </>
//     );
//   }

//   if (selectedMovie) {
//     return (
//       <MovieView
//         movie={selectedMovie}
//         onBackClick={() => setSelectedMovie(null)}
//       />
//     );
//   }

//   if (movies.length === 0) {
//     return <div>This list is empty</div>;
//   } else {
//     return (
//       <>
//         <div>
//           {movies.map((movie) => {
//             return (
//               <MovieCard
//                 key={movie._id}
//                 movie={movie}
//                 onMovieClick={(newSelectedMovie) => {
//                   setSelectedMovie(newSelectedMovie);
//                 }}
//               />
//             );
//           })}
//         </div>
//         <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//       </>
//     );
//   }
// };

export default MainView;
