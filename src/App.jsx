/** @format */

import { Outlet } from "react-router-dom";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default App;
