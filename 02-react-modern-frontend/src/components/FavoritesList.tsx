import "./FavoritesList.css";

interface FavoritesListProps {
  favorites: string[];
  onCityClick: (city: string) => void;
}

const FavoritesList = ({ favorites, onCityClick }: FavoritesListProps) => {
  return (
    <aside className="favorites-list">
      <h3 className="favorites-title">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="favorites-title-icon"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Favorite Cities
      </h3>

      {favorites.length === 0 ? (
        <div className="favorites-placeholder">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="favorites-icon"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="favorites-placeholder-text">
            No favorites yet. Search for cities to add them to your favorites!
          </p>
        </div>
      ) : (
        <div className="favorites-items">
          {favorites.map((city, index) => (
            <button
              key={index}
              className="favorite-item"
              onClick={() => onCityClick(city)}
              aria-label={`View weather for ${city}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="favorite-item-icon"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="favorite-city-name">{city}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
};

export default FavoritesList;
