import { createContext } from "react";
import { Cats } from "./types";

type SetFavoritesContext = React.Dispatch<React.SetStateAction<Cats[] | []>>;

export const FavoritesContext = createContext<Cats[] | []>([]);
export const SetFavoritesContext = createContext<SetFavoritesContext>(() => {
  throw Error("SetFavoritesContext is used without context");
});
