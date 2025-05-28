import { useState } from "react";
import type { Pokemon } from "@/lib/types";
import pokemonData from "../../data/pokemon_.json";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={"w-full caption-bottom text-sm " + (className || "")}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead className={"[&_tr]:border-b " + (className || "")} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      className={"[&_tr:last-child]:border-0 " + (className || "")}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors " +
        (className || "")
      }
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap " +
        (className || "")
      }
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={"p-2 align-middle whitespace-nowrap " + (className || "")}
      {...props}
    />
  );
}

function TableFooter({ children }: { children: React.ReactNode }) {
  return <tfoot><TableRow><TableCell colSpan={5}>{children}</TableCell></TableRow></tfoot>;
}

function PokemonTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(pokemonData.length / itemsPerPage);
  const paginatedData = pokemonData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-1376 mx-auto border border-neturals-100 rounded-k p-4">
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
          {paginatedData.map((pokemon: Pokemon) => (
            <TableRow key={pokemon.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={pokemon.image?.thumbnail ?? ""}
                    alt={pokemon.name.english}
                    className="w-20 h-20 object-contain rounded-full"
                  />
                  <span className="text-headingMdRegular font-mulish">{pokemon.name.english}</span>
                </div>
              </TableCell>
              <TableCell className="text-bodyRegular font-mulish">{pokemon.id}</TableCell>
              <TableCell className="max-w-[400px] truncate font-mulish text-bodyRegular">
                {pokemon.description}
              </TableCell>
              <TableCell className="font-mulish text-bodyRegular">{pokemon.base.Attack}</TableCell>
              <TableCell className="font-mulish text-bodyRegular ">{pokemon.base.HP}</TableCell>
            </TableRow>
          ))}
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
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          
            <div className="flex gap-4 text-neutrals-600">
              <span className="mr-2">
              {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                currentPage * itemsPerPage,
                pokemonData.length
              )} of ${pokemonData.length} items`}
            </span>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="disabled:opacity-50"
              >
                &lt;
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </TableFooter>
      </Table>
    </div>
  );
}

export default PokemonTable;
