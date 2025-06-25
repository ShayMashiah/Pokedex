import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PreBattlePage from "./pages/PreBattlePage";
import BattlePage from "./pages/BattlePage";
import { MyPokemonProvider } from "@/context/MyPokemonContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyPokemonProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prebattle" element={<PreBattlePage />} />
            <Route path="/battle" element={<BattlePage />} />
          </Routes>
        </Router>
      </MyPokemonProvider>
    </QueryClientProvider>
  );
}
export default App;
