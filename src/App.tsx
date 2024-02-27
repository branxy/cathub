import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { FavoritesContext, SetFavoritesContext } from "./constants";
import { useState } from "react";
import { Cats } from "./types";

// @ts-expect-error: example object
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exampleCat = [
  {
    id: "9ss",
    url: "https://cdn2.thecatapi.com/images/9ss.jpg",
    width: 600,
    height: 897,
  },
];

function App() {
  const [favorites, setFavorites] = useState<Cats[] | []>([]);

  return (
    <>
      <Navbar />
      <div className="content">
        <FavoritesContext.Provider value={favorites}>
          <SetFavoritesContext.Provider value={setFavorites}>
            <Outlet />
          </SetFavoritesContext.Provider>
        </FavoritesContext.Provider>
      </div>
    </>
  );
}

export default App;
