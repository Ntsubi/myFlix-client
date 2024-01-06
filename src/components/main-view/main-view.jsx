import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../nav-bar/nav-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfileView from "../profile-view/profile-view";

const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token])


  const updatedUser = user => {
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <BrowserRouter>
      <NavBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user)
                      setToken(token)
                    }
                    } />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} setUser={setUser} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      user={user}
                      token={token}
                      setUser={updatedUser}
                      movies={movies}
                    />
                  </Col>
                )
                }
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
