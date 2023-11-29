// index.js

import React from "react";
import ReactDOM from "react-dom/client";

import { AppWithUserContext } from "./routes";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppWithUserContext />
	</React.StrictMode>
);
