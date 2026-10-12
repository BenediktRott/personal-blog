import { Children } from "react";
import App from "../App";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Home } from "./Home/Home";
import { PostPage } from "./PostPage/PostPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  //Protected Pages
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/posts/:id",
            element: <PostPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
