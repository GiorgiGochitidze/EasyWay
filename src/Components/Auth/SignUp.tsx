import Form from "./Form";
import "./CSS/Auth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { usePacket } from "../../Hooks/PacketContext";

type FormDataTypes = {
  userName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();
  const { selectedPacket } = usePacket();

  // ✅ Alert and redirect if no packet selected
  useEffect(() => {
    if (!selectedPacket) {
      window.alert("რეგისტრაციამდე გთხოვთ შეარჩიოთ ერთ-ერთი პაკეტი");
      navigate("/about");
    }
  }, [selectedPacket, navigate]);

  const handleSignUp = ({ userName, email, password }: FormDataTypes) => {
    if (!userName || !email || !password) {
      return console.log("გთხოვთ შეავსოთ ყველა ველი");
    }

    axios
      .post("http://localhost:5000/signup", {
        userName,
        email,
        password,
        userPackage: selectedPacket,
      })
      .then((response) => {
        const { token, message } = response.data;

        Cookie.set("userAuthToken", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        // ✅ Remove packet from localStorage
        localStorage.removeItem("selectedPacket");

        setMsg(message);
        setTimeout(() => {
          setMsg("");
          navigate("/");
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log("მოხდა რაღაც შეცდომა რეგისტრაციის დროს", err);
      });
  };

  return (
    <div className="auth-container">
      <Form handleAuth={handleSignUp} msg={msg} authType={"SignUp"} />
    </div>
  );
};

export default SignUp;
