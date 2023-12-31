/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./googleSingIn/AuthContext";
import appRouter from "./routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <RouterProvider router={appRouter} />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
