import { useState } from 'react';

const useFavorites = () => {
  let initialFavorites: number[] = [];

  try {
    initialFavorites = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
  } catch (error) {
    initialFavorites = [];
    console.error('Failed to parse favorite movies');
  }

  const [favorites, setFavorites] = useState(initialFavorites);

  const addFavorites = (id: number) => {
    // todo: check if user is authenticated, if not show login modal

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
