/** @format */

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import Protected from "./googleSingIn/Protected";
import Board from "./components/Board";
import HeroSection from "./components/HeroSection";
import List from "./components/List";
import EditCard from "./components/EditCard";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HeroSection /> },
      {
        path: "/board",
        element: (
          <Protected>
            <Board />
          </Protected>
        ),
      },
      {
        path: "/board/:boardId",
        element: (
          <Protected>
            <List />
          </Protected>
        ),
      },
      {
        path: "/editCard/:boardId/:listId/:cardId",
        element: (
          <Protected>
            <EditCard />
          </Protected>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default appRouter;
