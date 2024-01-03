import React, { useState } from "react";
import { HeartFill } from "react-bootstrap-icons";

const FavIcon = ({ MovieID, setUser }) => {

  let user = JSON.parse(localStorage.getItem('user'));
  const defaultActive = user.FavoriteMovies.includes(MovieID)
  const [active, setActive] = useState(defaultActive);
  const token = localStorage.getItem('token');

  const handleFavorites = () => {

    if (!active) {
      console.log('Token', token, MovieID)
      fetch(`https://render-movie-api.onrender.com/users/${user.Username}/movies/${MovieID} `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({})
        })
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response));
          setUser(response);
          setActive(true);
          console.log(response);
          alert('Added to favorites')
        })
        .catch((err) => {
          console.error(err);
          alert('Something went wrong')
        });
    } else {
      fetch(`https://render-movie-api.onrender.com/users/${user.Username}/movies/${MovieID} `,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({})
        })
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response));
          setActive(false);
          setUser(response);
          console.log(response);
          alert('Removed from favorites');
        })
        .catch((err) => {
          console.error(err);
          alert('Something went wrong')
        })
      // if (response.ok) {
      //   alert('Removed from favorites');
      //   setActive(false);
      //   user.FavoriteMovies.filter(id => id !== MovieID);
      //   localStorage.setItem('user', JSON.stringify(user));
      //   setUser(user);
    }
  };

  return (
    <div onClick={handleFavorites}
      style={{ marginTop: "10px", float: "right" }} >
      <HeartFill style={{ color: "DimGray", color: active ? "Crimson" : "DimGrey", border: "5px, solid, #000000", size: "2em" }} />
    </div>
  );
};

export default FavIcon; 