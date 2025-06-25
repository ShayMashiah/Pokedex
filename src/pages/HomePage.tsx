import { Input } from "@/components/ui/Input/input";
import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import PokemonTable from "@/components/ui/Table/PokemonTable";
import { useEffect, useState } from "react";
import { Tab, TAB_LABELS, type Pokemon } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropDown/dropdown-menu";
import { SortOption } from "@/lib/types";
import { SORT_OPTIONS } from "@/lib/constants";
import { useLocation } from "react-router-dom";
import { useAllPokemons } from "@/lib/hooks/useAllPokemons";
import { useUserPokemons } from "@/lib/hooks/useUserPokemons";
import { useSearchPokemon } from "@/lib/hooks/useSearchPokemon";
import { userId } from "@/lib/constants";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    SortOption.default
  );
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const initialTab = location.state?.activeTab || Tab.All;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const { data: allPokemons = [] } = useAllPokemons();
  const { data: userPokemons = [] } = useUserPokemons();
  const { data: searchResults = [] } = useSearchPokemon(
    searchTerm.trim(),
    activeTab === Tab.User ? userId : undefined
  );

  useEffect(() => {
    if (searchTerm) return;

    const userIds = userPokemons.map((p) => p.id);
    const filtered =
      activeTab === Tab.User
        ? allPokemons.filter((p) => userIds.includes(p.id))
        : allPokemons;

    setPokemonData((prev) => {
      const isEqual =
        prev.length === filtered.length &&
        prev.every((p, i) => p.id === filtered[i].id);
      return isEqual ? prev : filtered;
    });
  }, [activeTab, allPokemons, userPokemons, searchTerm]);

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
    setSearchTerm(e.target.value.toLowerCase());
  };

  const displayedPokemons = searchTerm ? searchResults : pokemonData;

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
              <DropdownMenuTrigger
                isOpen={isOpen}
                className="max-w-full inline-flex min-w-101"
              >
                {selectedOption}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="h-38 w-206 font-mulish text-bodyRegular text-neutrals-500 border-k py-8 pl-8 cursor-pointer"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <PokemonTable key={activeTab} data={displayedPokemons} />
      </main>
    </div>
  );
}
export default HomePage;
