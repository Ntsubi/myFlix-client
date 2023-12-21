import { React, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const ProfileView = ({ user, token, setUser, movies }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleUpdate = (event) => {
    event.preventDefault();

    // let favoriteMovies = movies.filter(m => user.favoriteMovies.includes(m._id));

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
          window.location.reload();
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
      body: JSON.stringify(data)
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
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="Birthday" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleUpdate} >Update</Button>
          </Form>
        </Col>
      </Row>
    </Container>

  );
};

export default ProfileView;




