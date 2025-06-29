import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input/input";
import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import PokemonTable from "@/components/ui/Table/PokemonTable";
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
import { useUserPokemons } from "@/lib/hooks/useUserPokemons";
import { useAllPokemons } from "@/lib/hooks/useAllPokemons";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    SortOption.default
  );
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const location = useLocation();
  const initialTab = location.state?.activeTab || Tab.All;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const { data: allPokemonsData } = useAllPokemons(
    page,
    limit,
    searchTerm,
    sortBy,
    order
  );
  const { data: userPokemonsData } = useUserPokemons(
    page,
    limit,
    searchTerm,
    sortBy,
    order
  );

  useEffect(() => {
    if (activeTab === Tab.All && allPokemonsData) {
      setPokemonData(allPokemonsData.data);
      setTotalCount(allPokemonsData.totalCount);
      setTotalPages(allPokemonsData.totalPages);
    } else if (activeTab === Tab.User && userPokemonsData) {
      setPokemonData(userPokemonsData.data);
      setTotalCount(userPokemonsData.totalCount);
      setTotalPages(userPokemonsData.totalPages);
    } else {
      setPokemonData([]);
      setTotalCount(0);
      setTotalPages(1);
    }
  }, [activeTab, allPokemonsData, userPokemonsData, searchTerm]);

  const handleSelect = (value: SortOption) => {
    setSelectedOption(value);
    setIsOpen(false);

    switch (value) {
      case SortOption.AZ:
        setSortBy("nameEnglish");
        setOrder("asc");
        setPage(1);
        break;
      case SortOption.ZA:
        setSortBy("nameEnglish");
        setOrder("desc");
        setPage(1);
        break;
      case SortOption.PowerHighLow:
        setSortBy("attack");
        setOrder("desc");
        setPage(1);
        break;
      case SortOption.PowerLowHigh:
        setSortBy("attack");
        setOrder("asc");
        setPage(1);
        break;
      case SortOption.HPHighLow:
        setSortBy("hp");
        setOrder("desc");
        setPage(1);
        break;
      case SortOption.HPLowHigh:
        setSortBy("hp");
        setOrder("asc");
        setPage(1);
        break;
      default:
        setSortBy("id");
        setOrder("asc");
        setPage(1);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPage(1);
  };

  return (
    <div className="bg-neutrals-100 min-h-screen h-auto">
      <PokemonNavbar
        activeItem={activeTab}
        onChange={(newTab) => {
          setActiveTab(newTab);
          setPage(1);
        }}
      />

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
        <PokemonTable
          key={activeTab}
          data={pokemonData}
          totalCount={totalCount}
          totalPages={totalPages}
          currentPage={page}
          itemsPerPage={limit}
          sortBy={sortBy}
          order={order}
          search={searchTerm}
          activeTab={activeTab}
          onPageChange={setPage}
          onPageSizeChange={setLimit}
        />
      </main>
    </div>
  );
}

export default HomePage;
