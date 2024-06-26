'use client';

import { useState } from 'react';

const useFavorites = () => {
  let initialFavorites: number[] = [];

  try {
    initialFavorites = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
  } catch (error) {
    initialFavorites = [];
  }

  const [favorites, setFavorites] = useState(initialFavorites);

  const addFavorites = (id: number) => {
    if (!favorites.includes(id)) {
      const favsCopy = [...favorites];
      setFavorites([...favorites, id]);
      favsCopy.push(id);
      localStorage.setItem('favoriteMovies', JSON.stringify(favsCopy));
    } else {
      const favsCopy = [...favorites];
      const index = favorites.indexOf(id);
      favsCopy.splice(index, 1);
      setFavorites(favsCopy);
      localStorage.setItem('favoriteMovies', JSON.stringify(favsCopy));
    }
  };

  return { favorites, addFavorites };
};

export default useFavorites;
