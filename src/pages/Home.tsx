import { useCallback, useRef, useState } from "react";
import useFetchCats from "../hooks/useFetchCats";

import Cat from "../components/Cat/Cat";
import Modal from "../components/Modal";
import { Cats } from "../types";

function Home() {
  const [queryNumber, setQueryNumber] = useState(1);
  const [selectedCat, setSelectedCat] = useState<Cats | undefined>(undefined);
  const observerRoot = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { cats, isLoading, error } = useFetchCats(queryNumber);

  const observer = useRef<IntersectionObserver | undefined>();
  const observerTarget = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setQueryNumber((n) => n + 1);
          }
        },
        { rootMargin: "300px" }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  function handleModalClose() {
    setSelectedCat(undefined);
  }

  return (
    <div className="home" ref={observerRoot}>
      {cats
        ? cats.map((cat, i) => {
            if (i !== cats.length - 1) {
              return (
                <Cat
                  key={cat.id}
                  id={cat.id}
                  url={cat.url}
                  width={cat.width}
                  height={cat.height}
                  selectedCat={selectedCat}
                  setSelectedCat={setSelectedCat}
                />
              );
            } else {
              return (
                <Cat
                  ref={observerTarget}
                  key={cat.id}
                  id={cat.id}
                  url={cat.url}
                  width={cat.width}
                  height={cat.height}
                  selectedCat={selectedCat}
                  setSelectedCat={setSelectedCat}
                />
              );
            }
          })
        : ""}
      {isLoading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {selectedCat && (
        <Modal
          ref={modalRef}
          url={selectedCat?.url}
          width={selectedCat?.width}
          height={selectedCat?.height}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default Home;
