import { useState } from "react";
import "./CSS/Form.css";
import { Link } from "react-router-dom";
import LinkStyles from "../LinkStyles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

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

  return (
    <div className="form-container">
      <h1>{authType == "SignIn" ? "შესვლა" : "რეგისტრაცია"}</h1>
      {authType == "SignUp" && (
        <label htmlFor="userName">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="სახელი"
            type="text"
            id="userName"
            name="userName"
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
        />
      </label>
      <label style={{ position: "relative" }} htmlFor="password">
        {showPass && (
          <FaRegEye
            className="eye-icon"
            onClick={() => setShowPass(!showPass)}
          />
        )}
        {!showPass && (
          <FaRegEyeSlash
            className="eye-icon"
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
          style={{ paddingLeft: "10px", paddingRight: "30px" }}
        />
      </label>
      {msg && <p>{msg}</p>}
      <button onClick={() => handleAuth({ userName, email, password })}>
        {authType == "SignIn" ? "შესვლა" : "რეგისტრაცია"}
      </button>
      {authType == "SignIn" ? (
        <p>
          არ გაქვს აკაუნტი?{" "}
          <Link style={LinkStyles} to="/SignUp">
            დარეგისტრირდი
          </Link>
        </p>
      ) : (
        <p>
          გაქვს უკვე აკაუნტი?{" "}
          <Link style={LinkStyles} to="/SignIn">
            შესვლა
          </Link>
        </p>
      )}
    </div>
  );
};

export default Form;
