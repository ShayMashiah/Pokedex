import { Input } from "@/components/ui/Input/input";
import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import PokemonTable from "@/components/ui/Table/PokemonTable";
import PokemonData from "@/data/pokemon_.json";
import { useState } from "react";
import { Tab, TAB_LABELS } from "@/lib/types";



function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.All);

  return (
    <div className="bg-neutrals-100 min-h-screen">
      <PokemonNavbar activeItem={activeTab} onChange={setActiveTab} />

      <main className="max-w-1440 mx-auto px-10">
          <h1 className="text-headingLgMedium text-neutrals-400 mt-10 mb-6">
            {TAB_LABELS[activeTab]}
          </h1>

          <Input
            placeholder="Search Pokemon" 
          />
        <PokemonTable data={PokemonData} />
      </main>
    </div>
  );
}
export default HomePage;
