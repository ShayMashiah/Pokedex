import { Input } from "@/components/ui/Input/input";
import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import PokemonTable from "@/components/ui/Table/PokemonTable";
import PokemonData from "@/data/pokemon_.json";
import { useEffect, useState } from "react";
import { Tab, TAB_LABELS } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropDown/dropdown-menu";
import { SortOption } from "@/lib/types";
import { SORT_OPTIONS } from "@/lib/constants";
import { useMyPokemon } from "@/context/MyPokemonContext";
import { useLocation } from "react-router-dom";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    SortOption.default
  );
  const [pokemonData, setPokemonData] = useState(PokemonData);
  const [tabPokemonData, setTabPokemonData] = useState(PokemonData);
  const [searchTerm, setSearchTerm] = useState("");

  const { myPokemons } = useMyPokemon();

  const location = useLocation();
  const initialTab = location.state?.activeTab || Tab.All;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    let sourceData;

    if (activeTab === Tab.User) {
      sourceData = PokemonData.filter((pokemon) =>
        myPokemons.includes(pokemon.id)
      );
    } else {
      sourceData = PokemonData;
    }

    setPokemonData(sourceData);
    setTabPokemonData(sourceData);
  }, [activeTab, myPokemons]);

  const handleSelect = (value: SortOption) => {
    let sortedData = [...pokemonData];

    switch (value) {
      case SortOption.AZ:
        sortedData.sort((a, b) => a.name.english.localeCompare(b.name.english));
        break;
      case SortOption.ZA:
        sortedData.sort((a, b) => b.name.english.localeCompare(a.name.english));
        break;
      case SortOption.PowerHighLow:
        sortedData.sort((a, b) => b.base.Attack - a.base.Attack);
        break;
      case SortOption.PowerLowHigh:
        sortedData.sort((a, b) => a.base.Attack - b.base.Attack);
        break;
      case SortOption.HPHighLow:
        sortedData.sort((a, b) => b.base.HP - a.base.HP);
        break;
      case SortOption.HPLowHigh:
        sortedData.sort((a, b) => a.base.HP - b.base.HP);
        break;
      default:
        break;
    }

    setPokemonData(sortedData);
    setSelectedOption(value);
    setIsOpen(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = tabPokemonData.filter((pokemon) =>
      pokemon.name.english.toLowerCase().includes(value)
    );
    setPokemonData(filteredData);
  };

  return (
    <div className="bg-neutrals-100 min-h-screen h-auto">
      <PokemonNavbar activeItem={activeTab} onChange={setActiveTab} />

      <main className="max-w-1440 mx-auto px-10">
        <div className="max-w-1376 mx-auto">
          <h1 className="text-headingLgMedium font-mulish text-neutrals-400 mt-32 mb-10">
            {TAB_LABELS[activeTab]}
          </h1>

          <div className="flex items-center justify-between mt-6 mb-16">
            <Input
              placeholder="Search Pokemon"
              onChange={onInputChange}
              value={searchTerm}
              className="font-roboto text-bodyRegular"
            />
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger isOpen={isOpen}   className="max-w-full inline-flex min-w-101">
                {selectedOption}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="h-38 w-206 font-mulish text-bodyRegular text-neutrals-500 border-k cursor-pointer"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <PokemonTable key={activeTab} data={pokemonData}/>
      </main>
    </div>
  );
}
export default HomePage;
