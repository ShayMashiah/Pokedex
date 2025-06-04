import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PreBattlePage from "./pages/PreBattlePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prebattle" element={<PreBattlePage />} />
      </Routes>
    </Router>
  );
}
export default App;