import { LegacyRef, forwardRef } from "react";
import { Cats } from "../types";

interface ModalProps {
  url: Cats["url"] | undefined;
  width: Cats["width"] | undefined;
  height: Cats["height"] | undefined;
  handleModalClose: () => void;
}

const Modal = forwardRef(
  (props: ModalProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
    return (
      <div className="img-preview" ref={ref}>
        <div className="container">
          <button onClick={props.handleModalClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path
                fill="#262626"
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </button>
          <img
            src={props.url}
            alt="Cat"
            width={props.width}
            height={props.height}
          ></img>
        </div>
      </div>
    );
  }
);

export default Modal;
