import React, { useState } from "react";
import { HeartFill } from "react-bootstrap-icons";

const FavIcon = ({ MovieID, setUser }) => {

  const [active, setActive] = useState(false);
  let user = JSON.parse(localStorage.getItem('user'));
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
          if (response.ok) {
            alert('Added to favorites');
            setActive(!active);
            user = JSON.parse(localStorage.getItem('user'));
            user.FavoriteMovies.push(MovieID);
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            alert('Something went wrong')
          }
        })
        .catch((err) => {
          console.error(err);
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
          if (response.ok) {
            alert('Removed from favorites');
            setActive(false);
            user.FavoriteMovies.filter(id => id !== MovieID);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          } else {
            alert('Something went wrong');
          }
        });
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