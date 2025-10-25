import "./FavoritesList.css";

const FavoritesList = () => {
  return (
    <aside className="favorites-list">
      <h3 className="favorites-title">Favorite Cities</h3>
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
    </aside>
  );
};

export default FavoritesList;
