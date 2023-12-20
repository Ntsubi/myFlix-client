import { React, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Button";
import Button from "react-bootstrap/Button";

const ProfileView = ({ user, token, setUser, movie }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleUpdate = (event) => {
    event.preventDefault();


    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }
    //Update user info
    fetch(`https://render-movie-api.onrender.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` }
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          alert('Profile successfully updated');
        } else {
          alert('Update failed')
        }
      })
      .catch((err) => {
        console.error(err);
      })
  };

  const handleDelete = () => {

    fetch(`https://render-movie-api.onrender.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` }
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          alert('Your profile was successfully deleted');
          setUser(null);
        }
      })
  };

  return (

    <Form onSubmit={handleUpdate}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Name" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" onChange={(e) => setBirthday(e.target.value)} placeholder="Birthday" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleUpdate} >Update</Button>
    </Form>

  );
};

export default ProfileView;




