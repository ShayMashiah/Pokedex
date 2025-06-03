import { useMemo, useState } from "react";
import type { PokemonRow } from "@/lib/types";
import { pageSizeOptions } from "../../../lib/constants";
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
import { Variant } from "@/lib/types";

type PokemonTableProps = {
  data: PokemonRow[];
};

function PokemonTable({ data }: PokemonTableProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonRow | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const displayRangeText = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, data.length);
    const totalItems = data.length;
    return `${startIndex}-${endIndex} of ${totalItems} items`;
  }, [currentPage, itemsPerPage, data.length]);

  return (
    <div className="max-w-1376 mx-auto border border-neturals-100 rounded-k p-4">
      <Dialog>
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-50 border border-naturals-100">
              <TableHead className="w-408 h-48 pt-4 pl-10">
                Pokemon name
              </TableHead>
              <TableHead className="w-170 h-48 pt-4">ID</TableHead>
              <TableHead className="w-544 h-48 pt-4">Description</TableHead>
              <TableHead className="w-127 h-48 pt-4">Power level</TableHead>
              <TableHead className="w-127 h-48 pt-4">HP level</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow className="bg-neutrals-white border-neutrals-100 h-158 text-neutrals-800 text-headingMdRegular">
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  No Pokemons exist
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((pokemon: PokemonRow) => (
                <DialogTrigger
                  asChild
                  key={pokemon.id}
                  onClick={() => setSelectedPokemon(pokemon)}
                >
                  <TableRow className="bg-neutrals-white border-neutrals-100 hover:bg-primary-50 cursor-pointer w-1376 h-72">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={pokemon.image?.thumbnail ?? ""}
                          alt={pokemon.name.english}
                          className="w-20 h-20 object-contain rounded-full"
                        />
                        <span className="text-headingMdRegular font-mulish">
                          {pokemon.name.english}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-bodyRegular font-mulish">
                      {pokemon.id}
                    </TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <TableCell className="max-w-[400px] truncate font-mulish text-bodyRegular">
                            {pokemon.description}
                          </TableCell>
                        </TooltipTrigger>
                        <TooltipContent className="w-345 h-full bg-neutrals-1000 text-center text-neutral-100 gap-10 py-5 px-10">
                          <p>{pokemon.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TableCell className="font-mulish text-bodyRegular">
                      {pokemon.base.Attack}
                    </TableCell>
                    <TableCell className="font-mulish text-bodyRegular">
                      {pokemon.base.HP}
                    </TableCell>
                  </TableRow>
                </DialogTrigger>
              ))
            )}
          </TableBody>

          <TableFooter>
            <div className="flex justify-between items-center px-2 py-2 text-sm text-muted-foreground border-t border-neutrals-100">
              <div className="flex items-center text-neutrals-600 gap-2">
                <span>Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-neutrals-200 rounded px-2 py-1 text-sm"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 text-neutrals-600">
                <span className="text-muted-foreground text-sm">
                  {displayRangeText}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  &lt;
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50"
                >
                  &gt;
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
