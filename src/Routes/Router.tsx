import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import LoadingScreen from "../utils/loading-screen";
import ProtectedRoute from "./Protected-route";
import useAuthState from "../hooks/useAuthState";
import { styled } from "styled-components";

const Container = styled.div`
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
  const isAuthStateReady = useAuthState();
  return (
    <Container>
      {isAuthStateReady ? (
        <RouterProvider router={router} />
      ) : (
        <LoadingScreen />
      )}
    </Container>
  );
}

export default Router;
