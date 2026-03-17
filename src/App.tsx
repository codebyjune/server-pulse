import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Realtime from "./pages/Realtime";
function App() {
 

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/realtime" element={<Realtime />} />

        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
