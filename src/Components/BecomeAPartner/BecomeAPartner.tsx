import "./CSS/BecomeAPartner.css";
import { useMediaQuery } from "react-responsive";
import { useContext, useState } from "react";
import errorIcon from "/img/icons8-error-30.png";
import { LanguageContext } from "../../Hooks/LanguageContext";

const translations = {
  ge: {
    text: "გონივრული გადაწყვეტილება = მეტი მომხმარებელი",
    companyName: "კომპანიის დასახელება",
    contact: "საკონტაქტო",
    description: "მოკლე აღწერილობა",
    send: "გაგზავნა"
  },
  en: {
    text: "Smart decision = more customers",
    companyName: "Company Name",
    contact: "Contact",
    description: "Short Description",
    send: "Send"
  }
}

export default function BecomeAPartner() {
  const [error, setError] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const handleSubmit = async () => {
    const nameEl = document.querySelectorAll(
      ".infoInput"
    )[0] as HTMLInputElement | null;
    const contactEl = document.querySelectorAll(
      ".infoInput"
    )[1] as HTMLInputElement | null;
    const descEl = document.querySelector(
      ".infodescription"
    ) as HTMLTextAreaElement | null;

    if (!nameEl?.value.trim() || !contactEl?.value.trim()) {
      setError("field cannot be empty");
      return;
    }

    setError(""); // clear previous error

    // Build form data
    const formData = new FormData();
    formData.append("access_key", "edc74257-40b7-4d2e-8ae2-76c74ca476e7");
    formData.append("companyName", nameEl.value);
    formData.append("contact", contactEl.value);
    formData.append("description", descEl?.value || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        alert("შეტყობინება წარმატებით გაიგზავნა!"); // show success
        // Optionally clear fields
        nameEl.value = "";
        contactEl.value = "";
        if (descEl) descEl.value = "";
      } else {
        console.log("Error:", data);
        setError(data.message || "გაგზავნის შეცდომა");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("ვერ მოხერხდა გაგზავნა, სცადეთ ხელახლა.");
    }
  };

  const line = isTabletOrMobile ? 30 : 48;
  const secondLine = 11;

const langCtx = useContext(LanguageContext);
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language } = langCtx;

  const t = translations[language];

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
                {t.text}
              </h1>
            </div>
          </div>
        </div>
        <div className="inputBox">
          <div className="inputWrapper">
            <input
              type="text"
              className={`${error ? "redLine" : ""} infoInput inpu`}
              placeholder={t.companyName}
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
              placeholder={t.contact}
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
            placeholder={t.description}
            className="infodescription inpu"
          />
          <button onClick={handleSubmit} className="send">
            {t.send}
          </button>
        </div>
      </div>
    </div>
  );
}
