import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PreBattlePage from "./pages/PreBattlePage";
import BattlePage from "./pages/BattlePage";
import { MyPokemonProvider } from "@/context/MyPokemonContext";

function App() {
  return (
    <MyPokemonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prebattle" element={<PreBattlePage />} />
          <Route path="/battle" element={<BattlePage />} />
        </Routes>
      </Router>
    </MyPokemonProvider>
  );
}
export default App;
