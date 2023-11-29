// routes.js

import { createContext, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

export const UserContext = createContext();

export const AppWithUserContext = () => {
	const [userData, setUserData] = useState({});
	console.log(userData);
	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<ChakraProvider>
				<RouterProvider router={appRouter} />
			</ChakraProvider>
		</UserContext.Provider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <MainContent /> },
			// { path: "/list/:list", element: <CategoryProducts /> },
		],
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <ErrorPage />,
	},
]);
