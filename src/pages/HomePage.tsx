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
import { sortConfigMap } from "@/lib/constants";
import { DEFAULT_SORT_LABEL } from "@/lib/types";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { exportToExcel } from "@/lib/utils/exportToExcel";
import { Button } from "@/components/ui/Button/button";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption | string>(
    DEFAULT_SORT_LABEL
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
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: allPokemonsData, isLoading: isLoadingAll } = useAllPokemons(
    page,
    limit,
    debouncedSearchTerm,
    sortBy,
    order
  );

  const { data: userPokemonsData, isLoading: isLoadingUser } = useUserPokemons(
    page,
    limit,
    debouncedSearchTerm,
    sortBy,
    order
  );

  const { data: allPokemonsFull } = useAllPokemons(
    1,
    0,
    debouncedSearchTerm,
    sortBy,
    order
  );

  const { data: userPokemonsFull } = useUserPokemons(
    1,
    0,
    debouncedSearchTerm,
    sortBy,
    order
  );

  const loading = activeTab === Tab.All ? isLoadingAll : isLoadingUser;

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

    const config = sortConfigMap[value] ?? { sortBy: "id", order: "asc" };
    setSortBy(config.sortBy);
    setOrder(config.order);
    setPage(1);
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
        page={page}
        limit={limit}
        sortBy={sortBy}
        order={order}
        search={searchTerm}
      />

      <main className="max-w-1440 mx-auto px-32">
        <div className="max-w-1376 mx-auto">
          <h1 className="text-headingLgMedium font-mulish text-neutrals-400 mt-32 mb-10 ">
            {TAB_LABELS[activeTab]}
          </h1>

          <div className="flex items-center justify-between mt-6 mb-16">
            <Input
              placeholder="Search Pokemon"
              onChange={onInputChange}
              value={searchTerm}
              className="font-roboto text-bodyRegular"
            />
            <div className="flex gap-8">
              <Button
                onClick={() =>
                  exportToExcel(
                    activeTab === Tab.All
                      ? allPokemonsFull?.data ?? []
                      : userPokemonsFull?.data ?? []
                  )
                }
                variant="secondary"
                className="!text-bodyRegular font-roboto !rounded-k border-neutrals-200 hover:border-neutrals-500 text-neutrals-500 bg-neutrals-100 px-12 w-155 h-38 flex items-center justify-center gap-3"
                data-cy="export-to-excel-button"
                disabled={loading || pokemonData.length === 0}
              >
                Export to Excel
                <img
                  src="/src/assets/export.svg"
                  alt="Export"
                  className="w-14 h-14"
                />
              </Button>

              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger
                  isOpen={isOpen}
                  className="max-w-full inline-flex min-w-101"
                >
                  <p className="pl-12 font-roboto">{selectedOption}</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="h-38 w-206 text-bodyRegular text-neutrals-500 border-k py-8 pl-8 cursor-pointer"
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
          loading={loading}
        />
      </main>
    </div>
  );
}

export default HomePage;
