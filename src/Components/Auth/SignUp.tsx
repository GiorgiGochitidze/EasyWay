import Form from "./Form";
import "./CSS/Auth.css";
import { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

type FormDataTypes = {
  userName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = ({ userName, email, password }: FormDataTypes) => {
    if (!userName || !email || !password) {
      return console.log("გთხოვთ შეავსოთ ყველა ველი");
    }

    axios
      .post("http://localhost:5000/signup", {
        userName: userName,
        email: email,
        password: password,
      })
      .then((response) => {
        const { token, message } = response.data;

        Cookie.set("userAuthToken", token, {
          expires: 7, // token will last 7 days
          secure: true, // cookie only set over HTTPS (recommended in production)
          sameSite: "Strict", // prevent CSRF attacks
        });
        setMsg(message);
        setTimeout(() => {
          setMsg("");
          navigate("/");
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log("მოხდა რაღაც შეცდომა შესვლის დროს", err);
      });
  };

  return (
    <div className="auth-container">
      <Form handleAuth={handleSignUp} msg={msg} authType={"SignUp"} />
    </div>
  );
};

export default SignUp;
