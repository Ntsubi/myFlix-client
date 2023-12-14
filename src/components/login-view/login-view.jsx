import React from "react";
import { useState } from "react";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    }

    fetch('https://render-movie-api.onrender.com/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    <form onSubmit={handleSubmit} >
      <label>Username:
        <input type="text" value={username} minLength="5" onChange={(e) => setUsername(e.target.value)} required />
      </label>

      <label>Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginView;