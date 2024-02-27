import { useContext } from "react";
import { FavoritesContext } from "../constants";
import Cat from "../components/Cat/Cat";

function Favorites() {
  const favorites = useContext(FavoritesContext);
  if (favorites) {
    return (
      <div className="favorites">
        {favorites.map((cat) => (
          <Cat
            key={cat.id}
            id={cat.id}
            url={cat.url}
            width={cat.width}
            height={cat.height}
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
