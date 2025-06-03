import { Input } from "@/components/ui/Input/input";
import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import PokemonTable from "@/components/ui/Table/PokemonTable";
import PokemonData from "@/data/pokemon_.json";
import { useState } from "react";
import { Tab, TAB_LABELS } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropDown/dropdown-menu";

function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.All);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("Sort By");

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="bg-neutrals-100 min-h-screen">
      <PokemonNavbar activeItem={activeTab} onChange={setActiveTab} />

      <main className="max-w-1440 mx-auto px-10">
        <h1 className="text-headingLgMedium text-neutrals-400 mt-10 mb-6">
          {TAB_LABELS[activeTab]}
        </h1>

        <div className="flex items-center justify-between mb-6">
          <Input placeholder="Search Pokemon" />
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger isOpen={isOpen} >
              {selectedOption}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => handleSelect("A-Z")}
              >
                Alphabetical A-Z
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSelect("Z-A")}
              >
                Alphabetical A-Z
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("Power H-L")}>
                Power (High to low)
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("Power L-H")}>
                Power (Low to high)
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("HP H-L")}>
                HP (High to low)
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("hp L-H")}>
                HP (Low to high)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <PokemonTable data={PokemonData} />
      </main>
    </div>
  );
}
export default HomePage;
