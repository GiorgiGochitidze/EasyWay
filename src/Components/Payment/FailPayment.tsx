import React from "react";
import { useLocation } from "react-router-dom";
import "./CSS/PaymentResult.css";

const FailPayment: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  return (
    <div className="payment-container payment-fail">
      <h1 className="payment-title">გადახდა ვერ დასრულდა</h1>
      {orderId && (
        <p>Order ID: <span className="payment-order-id">{orderId}</span></p>
      )}
      <a href="/packets" className="payment-button">სცადეთ კიდევ</a>
    </div>
  );
};

export default FailPayment;
