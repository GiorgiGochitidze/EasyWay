import Form from "./Form";
import "./CSS/Auth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePacket } from "../../Hooks/PacketContext";

type FormDataTypes = {
  userName: string;
  email: string;
  password: string;
};

type BogLink = {
  rel: string;
  href: string;
};

const SignUp = () => {
  const [msg, setMsg] = useState<string>(""); // ✅ actively used
  const navigate = useNavigate();
  const { selectedPacket } = usePacket();

  useEffect(() => {
    if (!selectedPacket) {
      window.alert("რეგისტრაციამდე გთხოვთ შეარჩიოთ ერთ-ერთი პაკეტი");
      navigate("/packets");
    }
  }, [selectedPacket, navigate]);

  const handleSignUp = async ({ userName, email, password }: FormDataTypes) => {
    if (!userName || !email || !password || !selectedPacket) {
      setMsg("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }

    try {
      setMsg("გადამისამართება ბანკზე...");

      // 💾 Save user data temporarily
      localStorage.setItem(
        "pendingUser",
        JSON.stringify({ userName, email, password, selectedPacket })
      );

      // 🧾 Create BOG order
      const response = await axios.post("https://easyway-fmdo.onrender.com/create-order", {
        product_id: selectedPacket.type,
        product_name: selectedPacket.type,
        total_amount: parseFloat(selectedPacket.price.replace(/[^\d.]/g, "")),
        quantity: 1,
        duration: selectedPacket.duration,
        type: selectedPacket.type,
        price: selectedPacket.price,
      });

      const links: BogLink[] = response.data.links;
      const redirectUrl = links.find((l) => l.rel === "approve")?.href;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        setMsg("ბანკის გადამისამართების ბმული ვერ მოიძებნა");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      setMsg("დაფიქსირდა შეცდომა გადახდის წამოწყებისას");
    }
  };

  return (
    <div className="auth-container">
      <Form handleAuth={handleSignUp} msg={msg} authType={"SignUp"} />
    </div>
  );
};

export default SignUp;
