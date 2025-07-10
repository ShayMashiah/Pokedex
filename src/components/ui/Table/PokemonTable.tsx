import { useMemo, useState, useEffect } from "react";
import type { PokemonRow, Tab } from "@/lib/types";
import { pageSizeOptions } from "../../../lib/constants";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from "@/components/ui/Table/";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Table/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog/dialog";
import { Variant } from "@/lib/constants";
import pokeballIcon from "@/assets/pokador.png";
import { SearchX } from "lucide-react";
import { useUserPokemons } from "../../../lib/hooks/useUserPokemons";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

type PokemonTableProps = {
  data: PokemonRow[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  itemsPerPage: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
  activeTab: Tab;
  loading: boolean;
};

function PokemonTable({
  data,
  totalCount,
  totalPages,
  currentPage,
  itemsPerPage,
  sortBy = "id",
  order = "asc",
  search = "",
  activeTab,
  loading,
  onPageChange,
  onPageSizeChange,
}: PokemonTableProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonRow | null>(
    null
  );
  const [imagesLoadedMap, setImagesLoadedMap] = useState<
    Record<number, boolean>
  >({});
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [previousData, setPreviousData] = useState<PokemonRow[]>([]);
  const [isPaginating, setIsPaginating] = useState(false);

  const handlePageChange = (newPage: number) => {
    setIsPaginating(true);
    onPageChange(newPage);
  };

  useEffect(() => {
    if (!loading) {
      setIsPaginating(false);
    }
  }, [loading]);

  const shouldShowSkeleton = loading && !isPaginating;

  const handleImageLoad = (id: number) => {
    setImagesLoadedMap((prev) => ({ ...prev, [id]: true }));
  };

  const [myPokemons, setMyPokemons] = useState<number[]>([]);
  const { data: userPokemonsData } = useUserPokemons(
    currentPage,
    itemsPerPage,
    search,
    sortBy,
    order,
    activeTab
  );

  useEffect(() => {
    if (userPokemonsData && userPokemonsData.data.length > 0) {
      const ids = userPokemonsData.data.map((p) => Number(p.id));
      setMyPokemons(ids);
    }
  }, [userPokemonsData]);

  useEffect(() => {
    if (!loading && data.length > 0) {
      setHasInitiallyLoaded(true);
      setPreviousData(data);
    }
  }, [data, loading]);

  const displayRangeText = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalCount);
    return `${startIndex}-${endIndex} of ${totalCount} items`;
  }, [currentPage, itemsPerPage, totalCount]);

  const displayData = loading && previousData.length > 0 ? previousData : data;

  return (
    <div className="max-w-1376 mx-auto">
      <Dialog>
        <Table
          data-cy="pokemon-table"
          className="rounded-xl overflow-hidden w-1376 border border-neutrals-200"
        >
          <TableHeader>
            <TableRow className="bg-primary-50 border border-naturals-100 font-mulish text-bodyBold">
              <TableHead className="w-408 h-48 pt-4 pl-86 ">
                Pokemon name
              </TableHead>
              <TableHead className="w-170 h-48 pt-4">ID</TableHead>
              <TableHead className="w-544 h-48 pt-4">Description</TableHead>
              <TableHead className="w-127 h-48 pt-4">Power level</TableHead>
              <TableHead className="w-127 h-48 pt-4">HP level</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {shouldShowSkeleton ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex justify-center bg-neutrals-white border-neutrals-100 items-center py-20 w-full">
                    <Loader2 className="h-150 w-150 animate-spin text-neutrals-200" />
                  </div>
                </TableCell>
              </TableRow>
            ) : !loading && displayData.length === 0 ? (
              <TableRow className="bg-neutrals-white border-neutrals-100 h-158 text-neutrals-800 text-headingMdRegular">
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center p-10 text-neutrals-1100 font-mulish">
                    <div className="mb-16 h-150 w-150  bg-primary-50 rounded-full  items-center justify-center flex ">
                      <SearchX
                        size={64}
                        className="text-primary-300 h-70 w-70"
                      />
                    </div>
                    <span className="mt-2 text-lg font-medium">
                      No Pokemons were found
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              displayData.map((pokemon: PokemonRow) => {
                const isMine = myPokemons.includes(pokemon.id);
                const imageLoaded = imagesLoadedMap[pokemon.id] ?? false;

                return (
                  <DialogTrigger
                    asChild
                    key={pokemon.id}
                    onClick={() => setSelectedPokemon(pokemon)}
                  >
                    <TableRow
                      className={`bg-neutrals-white text-neutrals-300 border-neutrals-100 hover:bg-primary-50 cursor-pointer w-1376 h-72 ${
                        loading && hasInitiallyLoaded
                          ? "opacity-70"
                          : "opacity-100"
                      } transition-opacity duration-200`}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <div className="py-9 pl-16 pr-16">
                            <div className="bg-neutrals-900 rounded-full w-54 h-54 overflow-hidden flex items-center justify-center relative">
                              {!imageLoaded && (
                                <Skeleton className="absolute inset-0 w-full h-full rounded-full bg-neutrals-200" />
                              )}
                              <img
                                src={pokemon.image?.thumbnail ?? ""}
                                alt={pokemon.name.english}
                                onLoad={() => handleImageLoad(pokemon.id)}
                                className={`w-44 h-44 rounded-full object-cover transition-opacity duration-300 ${
                                  imageLoaded ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            </div>
                          </div>
                          <span
                            data-cy="pokemon-name"
                            className="text-headingMdRegular font-mulish"
                          >
                            {pokemon.name.english}
                          </span>
                          {isMine && (
                            <img
                              data-cy="pokeball-icon"
                              src={pokeballIcon}
                              alt="My Pokemon"
                              className="w-24 h-24 ml-8"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell
                        data-cy="pokemon-id"
                        className="text-bodyRegular font-mulish"
                      >
                        #{String(pokemon.id).padStart(4, "0")}
                      </TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TableCell
                            data-cy="pokemon-description"
                            className="max-w-[400px] truncate font-mulish text-bodyRegular pr-40"
                          >
                            <TooltipTrigger asChild>
                              <p className="truncate">{pokemon.description}</p>
                            </TooltipTrigger>
                            <TooltipContent className="w-345 h-full bg-neutrals-1000 text-center font-mulish text-neutral-100">
                              <p>{pokemon.description}</p>
                            </TooltipContent>
                          </TableCell>
                        </Tooltip>
                      </TooltipProvider>
                      <TableCell
                        data-cy="pokemon-power"
                        className="font-mulish text-bodyRegular"
                      >
                        Level {pokemon.base.Attack}
                      </TableCell>
                      <TableCell
                        data-cy="pokemon-hp"
                        className="font-mulish text-bodyRegular"
                      >
                        {pokemon.base.HP} HP
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                );
              })
            )}
          </TableBody>

          <TableFooter>
            <div className="pb-38">
              <div className="flex justify-between items-center py-10 px-10 font-roboto text-captionRegular rounded-b-k  bg-neutrals-white ">
                <div className="flex items-center text-neutrals-650 gap-14">
                  <span>Rows per page:</span>
                  <select
                    data-cy="rows-per-page-select"
                    value={itemsPerPage}
                    onChange={(e) => {
                      const newSize = Number(e.target.value);
                      onPageSizeChange(newSize);
                      onPageChange(1);
                    }}
                    className=" rounded px-2 py-1 "
                  >
                    {pageSizeOptions.map((size) => (
                      <option
                        data-cy="rows-per-page-option"
                        key={size}
                        value={size}
                        className=""
                      >
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex text-neutrals-650 gap-32">
                  <span data-cy="display-range-text">{displayRangeText}</span>

                  <button
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="disabled:opacity-50"
                  >
                    <ChevronLeft size={16} data-cy="pagination-previous" />
                  </button>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="disabled:opacity-50 gap-20"
                  >
                    <ChevronRight size={16} data-cy="pagination-next" />
                  </button>
                </div>
              </div>
            </div>
          </TableFooter>
        </Table>

        {selectedPokemon && (
          <DialogContent
            variant={Variant.PokeInfo}
            pokemon={selectedPokemon}
            page={currentPage}
            limit={itemsPerPage}
            sortBy={sortBy}
            order={order}
            search={search}
            activeTab={activeTab}
          />
        )}
      </Dialog>
    </div>
  );
}

export default PokemonTable;
