import { useEffect } from "react";
import AppRouter from "./AppRouter";

const App = () => {
  useEffect(() => {
    const preventDuplicateTab = () => {
      if (sessionStorage.createTS) {
        if (!window.name) {
          window.name = "*ukn*";
          sessionStorage.createTS = Date.now();
          window.location.replace("/");
        }
      } else {
        sessionStorage.createTS = Date.now();
      }
    };

    preventDuplicateTab();
  }, []);

  return (
    <AppRouter />
  );
};

export default App;
