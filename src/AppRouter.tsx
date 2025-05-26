import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRouter;