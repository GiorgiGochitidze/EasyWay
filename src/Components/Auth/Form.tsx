import { useContext, useState } from "react";
import "./CSS/Form.css";
import { Link } from "react-router-dom";
import LinkStyles from "../LinkStyles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import phoneVerified from "../../assets/smartPhoneVerified.jpg";
import { ThemeContext } from "../../Hooks/ThemeContext";

type FormDataTypes = {
  userName: string;
  email: string;
  password: string;
};

type UserAuthTypes = {
  authType: string;
  handleAuth: (data: FormDataTypes) => void;
  msg: string;
};

const Form = ({ authType, handleAuth, msg }: UserAuthTypes) => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);

  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("ThemeContext.Provider is missing");
  }
  const { isDark } = theme;

  return (
    <div className={`form-container ${isDark ? "dark" : ""}`}>
      <img width={"50%"} src={phoneVerified} alt="verified phone image" />
      <div className="form-part">
        <h1 className={isDark ? "dark" : ""}>
          {authType == "SignIn" ? "შესვლა" : "რეგისტრაცია"}
        </h1>
        {authType == "SignUp" && (
          <label htmlFor="userName">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="სახელი"
              type="text"
              id="userName"
              name="userName"
              className={isDark ? "dark" : ""}
            />
          </label>
        )}
        <label htmlFor="email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ემაილი"
            type="text"
            id="email"
            name="email"
            className={isDark ? "dark" : ""}
          />
        </label>
        <label style={{ position: "relative" }} htmlFor="password">
          {showPass && (
            <FaRegEye
              className={`eye-icon ${isDark ? "dark" : ""}`}
              onClick={() => setShowPass(!showPass)}
            />
          )}
          {!showPass && (
            <FaRegEyeSlash
              className={`eye-icon ${isDark ? "dark" : ""}`}
              onClick={() => setShowPass(!showPass)}
            />
          )}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="პაროლი"
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            className={isDark ? "dark" : ""}
            style={{ paddingLeft: "10px", paddingRight: "30px" }}
          />
        </label>
        {msg && <p>{msg}</p>}
        <button onClick={() => handleAuth({ userName, email, password })}>
          {authType == "SignIn" ? "შესვლა" : "რეგისტრაცია"}
        </button>
        {authType == "SignIn" ? (
          <p
            style={{
              color: isDark ? "#f8fafc" : "",
              transition: "color 0.2s ease-in-out",
            }}
          >
            არ გაქვს აკაუნტი?{" "}
            <Link
              style={{
                ...LinkStyles,
                color: isDark ? "#f8fafc" : "#000",
                transition: "color 0.2s ease-in-out",
              }}
              to="/SignUp"
            >
              დარეგისტრირდი
            </Link>
          </p>
        ) : (
          <p
            style={{
              color: isDark ? "#f8fafc" : "",
              transition: "color 0.2s ease-in-out",
            }}
          >
            გაქვს უკვე აკაუნტი?{" "}
            <Link style={LinkStyles} to="/SignIn">
              შესვლა
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
