import { React, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Button";
import Button from "react-bootstrap/Button";

const ProfileView = () => {

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



};




