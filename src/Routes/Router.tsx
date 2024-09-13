import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import { useEffect, useState } from "react";
import LoadingScreen from "../utils/loading-screen";
import { auth } from "../firebase/firebase";
import styled from "styled-components";
import ProtectedRoute from "./Protected-route";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

function Router() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default Router;
