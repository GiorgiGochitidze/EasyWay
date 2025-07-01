import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home.tsx";
import AboutCard from "./Components/AboutCard/AboutCard.tsx";
import Partniors from "./Components/Home/Partniors/Partniors.tsx";
import BecomeAPartner from "./Components/BecomeAPartner/BecomeAPartner.tsx";
import AboutDiscounts from "./Components/AboutDiscounts/AboutDiscounts.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/about",
        element: <AboutCard />,
      },
      {
        path: "/partners",
        element: <Partniors />,
      },
      {
        path: "/new-partner",
        element: <BecomeAPartner />,
      },
      {
        path: "/new-link",
        element: <AboutDiscounts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
