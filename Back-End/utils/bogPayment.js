const axios = require("axios");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const getToken = async () => {
  try {
    const data = new URLSearchParams({ grant_type: "client_credentials" });

    const response = await axios.post(
      "https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token",
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        auth: { username: CLIENT_ID, password: CLIENT_SECRET },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error.response?.data || error.message);
    throw error;
  }
};

const createOrder = async ({ product_id, product_name, total_amount, quantity }) => {
  try {
    const token = await getToken();

    const orderId = `order_${product_id}_${Date.now()}`;

    const orderData = {
      callback_url: "https://easyway-fmdo.onrender.com/callback",
      external_order_id: orderId,
      purchase_units: {
        currency: "GEL",
        total_amount,
        basket: [
          {
            quantity,
            unit_price: total_amount,  // since quantity=1, unit_price=total_amount
            product_id,
            product_name,
          },
        ],
      },
      redirect_urls: {
        success: `https://easywaygeo.netlify.app/success?order_id=${orderId}`,
        fail: `https://easywaygeo.netlify.app/fail?order_id=${orderId}`,
      },
    };

    const response = await axios.post(
      "https://api.bog.ge/payments/v1/ecommerce/orders",
      orderData,
      {
        headers: {
          "Accept-Language": "ka",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = createOrder;
