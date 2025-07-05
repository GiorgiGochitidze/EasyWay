import React from "react";
import { useLocation } from "react-router-dom";
import "./CSS/PaymentResult.css";

const SuccessPayment: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  return (
    <div className="payment-container payment-success">
      <h1 className="payment-title">გადახდა წარმატებით დასრულდა!</h1>
      {orderId && (
        <p>Order ID: <span className="payment-order-id">{orderId}</span></p>
      )}
      <a href="/" className="payment-button">მთავარი გვერდი</a>
    </div>
  );
};

export default SuccessPayment;
