import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PacketProvider } from "./Hooks/PacketContext.tsx";
import { TokenProvider } from "./Hooks/TokenContext.tsx";
const SignUp = React.lazy(() => import("./Components/Auth/SignUp.tsx"));
const Policy = React.lazy(() => import("./Components/Policy/Policy.tsx"));
const Home = React.lazy(() => import("./Components/Home/Home.tsx"));
const AboutCard = React.lazy(
  () => import("./Components/AboutCard/AboutCard.tsx")
);
const Partniors = React.lazy(
  () => import("./Components/Home/Partniors/Partniors.tsx")
);
const BecomeAPartner = React.lazy(
  () => import("./Components/BecomeAPartner/BecomeAPartner.tsx")
);
const SignIn = React.lazy(() => import("./Components/Auth/SignIn.tsx"));
const UserProfile = React.lazy(
  () => import("./Components/UserProfile/UserProfile.tsx")
);
const AddPartner = React.lazy(
  () => import("./Components/AddPartner/AddPartner.tsx")
);
const Terms = React.lazy(
  () => import("./Components/TermsAndConditions/Terms.tsx")
);
const PartnerDetail = React.lazy(
  () => import("./Components/Home/Partniors/PartnerDetail.tsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/packets",
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
        path: "/SignIn",
        element: <SignIn />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
      {
        path: "/Privacy&Policy",
        element: <Policy />,
      },
      {
        path: "/userProfile",
        element: <UserProfile />,
      },
      {
        path: "/addPartner",
        element: <AddPartner />,
      },
      {
        path: "/Terms&Conditions",
        element: <Terms />,
      },
      {
        path: "/partners/:id",
        element: <PartnerDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<></>}>
    <TokenProvider>
      <PacketProvider>
        <RouterProvider router={router} />
      </PacketProvider>
    </TokenProvider>
  </Suspense>
);
