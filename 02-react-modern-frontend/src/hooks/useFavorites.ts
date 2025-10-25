import useLocalStorage from "./useLocalStorage";

interface UseFavoritesReturn {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  isFavorite: (city: string) => boolean;
  toggleFavorite: (city: string) => void;
}

const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "weatherFavorites",
    []
  );

  const addFavorite = (city: string) => {
    if (!city || favorites.includes(city)) {
      return;
    }
    setFavorites([...favorites, city]);
  };

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter((fav) => fav !== city));
  };

  const isFavorite = (city: string) => {
    return favorites.includes(city);
  };

  const toggleFavorite = (city: string) => {
    if (isFavorite(city)) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};

export default useFavorites;
