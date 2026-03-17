import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Realtime from "./pages/Realtime";
import History from "./pages/History";
function App() {
 

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/realtime" element={<Realtime />} />
 <Route path="/history" element={<History />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
