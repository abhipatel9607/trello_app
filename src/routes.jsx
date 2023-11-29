import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import MainContent from "./components/MainContent";
// import Login from "./components/Login";

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

export default appRouter;
