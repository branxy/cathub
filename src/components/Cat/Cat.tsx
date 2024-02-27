import { Dispatch, SetStateAction, forwardRef, useState } from "react";
import FavoriteBtn from "./FavoriteBtn";
import { Cats } from "../../types";

interface CatProps {
  id: Cats["id"];
  url: Cats["url"];
  width: Cats["width"];
  height: Cats["height"];
  selectedCat?: Cats | undefined;
  setSelectedCat?: Dispatch<SetStateAction<Cats | undefined>>;
}

const Cat = forwardRef(
  (props: CatProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const [isHovered, setIsHovered] = useState(false);
    const { id, url, width, height, selectedCat, setSelectedCat } = props;

    function handleMouseEnter() {
      setIsHovered(true);
    }

    function handleMouseLeave() {
      setIsHovered(false);
    }

    function handleCatClick() {
      if (setSelectedCat && (!selectedCat || selectedCat.url !== url)) {
        setSelectedCat({
          id,
          url,
          width,
          height,
        });
      }
    }

    if (ref) {
      return (
        <>
          <div
            ref={ref}
            className="cat"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={url}
              alt="Cat"
              width={225}
              height={225}
              onClick={handleCatClick}
            />
            {isHovered && <FavoriteBtn {...props} />}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="cat"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={url}
              alt="Cat"
              width={225}
              height={225}
              onClick={handleCatClick}
            />
            {isHovered && <FavoriteBtn {...props} />}
          </div>
        </>
      );
    }
  }
);

export default Cat;
