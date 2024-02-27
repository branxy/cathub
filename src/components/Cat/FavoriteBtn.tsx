import { useContext, useState } from "react";

import SvgHovered from "./SvgHovered";
import SvgUnhovered from "./SvgUnhovered";

import { FavoritesContext, SetFavoritesContext } from "../../constants";

import { Cats } from "../../types";

function FavoriteBtn({ id, url, width, height }: Cats) {
  const favorites = useContext(FavoritesContext);
  const setFavorites = useContext(SetFavoritesContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((el) => el.id === id)
  );

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function toggleIsFavorite() {
    setIsFavorite((current) => !current);
    if (!isFavorite) {
      const newFavorite = {
        id,
        url,
        width,
        height,
      };
      setFavorites([...favorites, newFavorite]);
    } else {
      const newFavorites = favorites.filter((cat) => cat.id !== id);
      setFavorites(newFavorites);
    }
  }

  return (
    <button
      className="add-to-favorites"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {(isFavorite || isHovered) && <SvgHovered onClick={toggleIsFavorite} />}
      {!isFavorite && !isHovered && <SvgUnhovered onClick={toggleIsFavorite} />}
    </button>
  );
}

export default FavoriteBtn;
