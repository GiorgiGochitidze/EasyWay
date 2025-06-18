import "./CSS/BecomeAPartner.css";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import errorIcon from "/img/icons8-error-30.png";
export default function BecomeAPartner() {
  const [error, setError] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const handleSubmit = () => {
    const inputEl = document.querySelector(
      ".infoInput"
    ) as HTMLInputElement | null;
    if (!inputEl || !inputEl.value.trim()) {
      setError("field cannot be empty");
    } else {
      setError("");
    }
  };

  const line = isTabletOrMobile ? 30 : 48;
  const secondLine = 11;

  return (
    <div className="becomeAPartner">
      <h1 className="h1">Contact us</h1>
      <div className="wholeBox">
        {" "}
        <div>
          <div className="contact">
            <h2 className="email">Email</h2>
            <p className="email">easywaygeo@gmail.com</p>
            <h2 className="phone">Phone</h2>
            <p className="phone">+37411224000</p>
            <h2 className="address">Address</h2>
            <div className="line">
              {Array.from({ length: line }).map((_, index) => (
                <p key={index}>_</p>
              ))}
              <svg
                className="svg"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 30.02 15.612 l -11.536 3.41 l -3.391 11.997 L 11.67 19.03 L 0.02 15.538 l 11.644 -3.522 L 15.053 0.019 l 3.422 11.988 l 11.545 3.605 Z"
                  fill="#000"
                />
              </svg>
              {Array.from({ length: secondLine }).map((_, index) => (
                <p key={index}>_</p>
              ))}
            </div>
            <div>
              {" "}
              <h1 className="miniText">
                გონივრული გადაწყვეტილება = მეტი მომხმარებელი
              </h1>
            </div>
          </div>
        </div>
        <div className="inputBox">
          <div className="inputWrapper">
            <input
              type="text"
              className={`${error ? "redLine" : ""} infoInput inpu`}
              placeholder="კომპანიის დასახელება"
            />
            <span className="star">*</span>
          </div>
          {error && (
            <p className="errorMessage">
              <img className="errorImage" src={errorIcon} />
              {error}
            </p>
          )}

          <div className="inputWrapper">
            <input
              type="text"
              className={`${error ? "redLine" : ""} infoInput inpu`}
              placeholder="საკონტაქტო"
            />
            <span className="star">*</span>
          </div>
          {error && (
            <p className="errorMessage">
              <img className="errorImage" src={errorIcon} />
              {error}
            </p>
          )}
          <textarea
            placeholder="მოკლე აღწერილობა"
            className="infodescription inpu"
          />
          <button onClick={handleSubmit} className="send">
            გაგზავნა
          </button>
        </div>
      </div>
    </div>
  );
}
