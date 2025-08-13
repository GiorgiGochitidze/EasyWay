import { useContext, useState } from "react";
import "./CSS/Form.css";
import { Link } from "react-router-dom";
import LinkStyles from "../LinkStyles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import phoneVerified from "../../assets/smartPhoneVerified.jpg";
import { ThemeContext } from "../../Hooks/ThemeContext";
import { LanguageContext } from "../../Hooks/LanguageContext";

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

// Language dictionary
const translations = {
  ge: {
    signIn: "შესვლა",
    signUp: "რეგისტრაცია",
    name: "სახელი",
    email: "ემაილი",
    password: "პაროლი",
    noAccount: "არ გაქვს აკაუნტი?",
    registerHere: "დარეგისტრირდი",
    haveAccount: "გაქვს უკვე აკაუნტი?",
    loginHere: "შესვლა",
  },
  en: {
    signIn: "Sign In",
    signUp: "Sign Up",
    name: "Name",
    email: "Email",
    password: "Password",
    noAccount: "Don't have an account?",
    registerHere: "Register",
    haveAccount: "Already have an account?",
    loginHere: "Login",
  },
};

const Form = ({ authType, handleAuth, msg }: UserAuthTypes) => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);

  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("ThemeContext.Provider is missing");
  const { isDark } = theme;

  const langCtx = useContext(LanguageContext);
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language } = langCtx;

  const t = translations[language];

  return (
    <div className={`form-container ${isDark ? "dark" : ""}`}>
      <img width={"50%"} src={phoneVerified} alt="verified phone image" />
      <div className="form-part">
        <h1 className={isDark ? "dark" : ""}>
          {authType === "SignIn" ? t.signIn : t.signUp}
        </h1>

        {authType === "SignUp" && (
          <label htmlFor="userName">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t.name}
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
            placeholder={t.email}
            type="text"
            id="email"
            name="email"
            className={isDark ? "dark" : ""}
          />
        </label>

        <label style={{ position: "relative" }} htmlFor="password">
          {showPass ? (
            <FaRegEye
              className={`eye-icon ${isDark ? "dark" : ""}`}
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <FaRegEyeSlash
              className={`eye-icon ${isDark ? "dark" : ""}`}
              onClick={() => setShowPass(!showPass)}
            />
          )}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            className={isDark ? "dark" : ""}
            style={{ paddingLeft: "10px", paddingRight: "30px" }}
          />
        </label>

        {msg && <p>{msg}</p>}
        <button onClick={() => handleAuth({ userName, email, password })}>
          {authType === "SignIn" ? t.signIn : t.signUp}
        </button>

        {authType === "SignIn" ? (
          <p
            style={{
              color: isDark ? "#f8fafc" : "",
              transition: "color 0.2s ease-in-out",
            }}
          >
            {t.noAccount}{" "}
            <Link
              style={{
                ...LinkStyles,
                color: isDark ? "#f8fafc" : "#000",
                transition: "color 0.2s ease-in-out",
              }}
              to="/SignUp"
            >
              {t.registerHere}
            </Link>
          </p>
        ) : (
          <p
            style={{
              color: isDark ? "#f8fafc" : "",
              transition: "color 0.2s ease-in-out",
            }}
          >
            {t.haveAccount}{" "}
            <Link style={LinkStyles} to="/SignIn">
              {t.loginHere}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
