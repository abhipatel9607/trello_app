/** @format */

import { Outlet } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import AppHeader from "./components/AppHeader";
import { LoadContext } from "./helper/loderConfig";

function App() {
  const { isLoading } = LoadContext();

  return (
    <div>
      <AppHeader />
      <Outlet />

      {isLoading && (
        <Center
          zIndex={"1000"}
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          background="rgba(0, 0, 0, 0.5)"
        >
          <Spinner size="xl" color="white" />
        </Center>
      )}
    </div>
  );
}

export default App;
