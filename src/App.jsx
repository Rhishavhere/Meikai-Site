import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BetaDownload from "./BetaDownload";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reallyreallybeta" element={<BetaDownload />} />
      </Routes>
    </Router>
  );
}
