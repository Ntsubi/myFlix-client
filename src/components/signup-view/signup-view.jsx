import React from 'react';
import { useState } from 'react';

const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }
    fetch('https://render-movie-api.onrender.com/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          alert('Signup successful');
          window.location.reload();
        } else {
          alert('Signup failed');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} minLength="5" required />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>Birthday:
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupView;