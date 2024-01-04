import { React, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FavoriteMovies from "./fav-movies";
import moment from "moment/moment";

const ProfileView = ({ user, token, setUser, movies }) => {
  console.log(user, movies)
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (movies) {
      setFavoriteMovies(movies.filter(m => user.FavoriteMovies.includes(m._id)));
    }
  }, [movies, user]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }
    //Update user info
    console.log("Token", token);
    fetch(`https://render-movie-api.onrender.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          alert('Your profile was successfully updated');
        } else {
          alert('Update failed')
        }
        return response.json();
      })
      .then((_) => { })
      .catch((err) => {
        console.error(err);
        alert('Update failed')
      })
  };

  const handleDelete = () => {

    fetch(`https://render-movie-api.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Your profile was successfully deleted');
          setUser(null);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('There was a problem, your account could not be deleted');
      })
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required={true} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" value={moment(birthday).format("yyyy-MM-DD")} onChange={(e) => setBirthday(e.target.value)} placeholder="Birthday" />
            </Form.Group>
            <Button variant="primary" type="submit">Update</Button>
            <Button variant="danger" type="button" onClick={handleDelete}>Delete</Button>
          </Form>
        </Col>
      </Row>
      {favoriteMovies.length > 0 &&
        <Row>
          <FavoriteMovies favoriteMovies={favoriteMovies} setUser={setUser} />
        </Row>
      }
    </Container>

  );
};

export default ProfileView;




