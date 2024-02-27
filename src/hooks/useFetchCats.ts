import { useEffect, useState } from "react";
import { Cats } from "../types";

function useFetchCats(queryNumber: number) {
  const [cats, setCats] = useState<Cats[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchCats();
    }
    return () => {
      ignore = true;
    };
  }, [queryNumber]);

  function fetchCats() {
    setIsLoading(true);
    fetch("https://api.thecatapi.com/v1/images/search?limit=10", {
      headers: { "x-api-key": import.meta.env.CAT_API_KEY },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(`${resp.statusText}`);
        }
      })
      .then((data) => {
        setCats((currentCats) => {
          if (currentCats) {
            const newCats = [...new Set([...currentCats, ...data])];
            return newCats;
          } else {
            return [...data];
          }
        });
        setError(undefined);
      })
      .catch((error) => {
        setError(error.message);
        setCats(undefined);
      })
      .finally(() => setIsLoading(false));
  }

  return { cats, isLoading, error };
}

export default useFetchCats;
