import { useMemo, useState, useEffect } from "react";
import type { PokemonRow } from "@/lib/types";
import { pageSizeOptions } from "../../../lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

type PokemonTableProps = {
  data: PokemonRow[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  itemsPerPage: number;
};

function PokemonTable({
  data,
  totalCount,
  totalPages,
  currentPage,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
}: PokemonTableProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonRow | null>(
    null
  );
  const [myPokemons, setMyPokemons] = useState<number[]>([]);
  const { data: userPokemonsData } = useUserPokemons(currentPage, itemsPerPage);

  useEffect(() => {
    if (userPokemonsData && userPokemonsData.data.length > 0) {
      const ids = userPokemonsData.data.map((p) => Number(p.id));
      setMyPokemons(ids);
    }
  }, [userPokemonsData]);

  const displayRangeText = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalCount);
    return `${startIndex}-${endIndex} of ${totalCount} items`;
  }, [currentPage, itemsPerPage, totalCount]);

  return (
    <div className="max-w-1376 mx-auto p-4">
      <Dialog>
        <Table className="rounded-xl overflow-hidden w-1376 border border-neutrals-200">
          <TableHeader>
            <TableRow className="bg-primary-50 border border-naturals-100 font-mulish text-bodyBold">
              <TableHead className="w-408 h-48 pt-4 pl-66 ">
                Pokemon name
              </TableHead>
              <TableHead className="w-170 h-48 pt-4">ID</TableHead>
              <TableHead className="w-544 h-48 pt-4">Description</TableHead>
              <TableHead className="w-127 h-48 pt-4">Power level</TableHead>
              <TableHead className="w-127 h-48 pt-4">HP level</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
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
              data.map((pokemon: PokemonRow) => {
                const isMine = myPokemons.includes(pokemon.id);
                return (
                  <DialogTrigger
                    asChild
                    key={pokemon.id}
                    onClick={() => setSelectedPokemon(pokemon)}
                  >
                    <TableRow className="bg-neutrals-white text-neutrals-300  border-neutrals-100 hover:bg-primary-50 cursor-pointer w-1376 h-72">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="py-9 pl-16 pr-13.5 ">
                            <div className="bg-neutrals-900 rounded-full w-54 h-54 overflow-hidden flex items-center justify-center">
                              <img
                                src={pokemon.image?.thumbnail ?? ""}
                                alt={pokemon.name.english}
                                className="  object-cover w-44 h-44"
                              />
                            </div>
                          </div>
                          <span className="text-headingMdRegular font-mulish">
                            {pokemon.name.english}
                          </span>
                          {isMine && (
                            <img
                              src={pokeballIcon}
                              alt="My Pokemon"
                              className="w-24 h-24 ml-8"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-bodyRegular font-mulish">
                        #{String(pokemon.id).padStart(4, "0")}
                      </TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TableCell className="max-w-[400px] truncate font-mulish text-bodyRegular pr-40">
                            <TooltipTrigger asChild>
                              <p className="truncate">{pokemon.description}</p>
                            </TooltipTrigger>
                            <TooltipContent className="w-345 h-full bg-neutrals-1000 text-center font-mulish text-neutral-100">
                              <p>{pokemon.description}</p>
                            </TooltipContent>
                          </TableCell>
                        </Tooltip>
                      </TooltipProvider>
                      <TableCell className="font-mulish text-bodyRegular">
                        Power Level {pokemon.base.Attack}
                      </TableCell>
                      <TableCell className="font-mulish text-bodyRegular">
                        {pokemon.base.HP} HP
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                );
              })
            )}
          </TableBody>

          <TableFooter>
            <div className="flex justify-between items-center py-10 px-10  rounded-b-k text-sm text-muted-foreground bg-neutrals-white ">
              <div className="flex items-center text-neutrals-650 gap-14">
                <span>Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    const newSize = Number(e.target.value);
                    onPageSizeChange(newSize);
                    onPageChange(1);
                  }}
                  className=" rounded px-2 py-1 text-sm"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex text-neutrals-650 gap-32">
                <span className="text-muted-foreground text-sm">
                  {displayRangeText}
                </span>

                <button
                  onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    onPageChange(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50 gap-20"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </TableFooter>
        </Table>

        {selectedPokemon && (
          <DialogContent variant={Variant.PokeInfo} pokemon={selectedPokemon} />
        )}
      </Dialog>
    </div>
  );
}

export default PokemonTable;
