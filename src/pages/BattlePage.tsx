import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/DropDown/dropdown-menu";
import { useState } from "react";
import type { Pokemon } from "@/lib/types";
import { useLocation } from "react-router-dom";

function BattlePage() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { selectedPokemon } = location.state || {};
  const [fightingPokemon, setFightingPokemon] = useState<Pokemon | null>(
    selectedPokemon
  );

  return (
    <div className="bg-neutrals-100 max-w-1440 mx-auto max-h-1024">
      <PokemonNavbar
        activeItem={Tab.Null}
        onChange={() => console.log("Battle mode")}
      />
      <div className="w-full text-center mt-20 mb-6">
        <h1 className="text-headingXXLgBold font-mulish text-neutrals-400">
          Fighting Area
        </h1>
        <p className="text-textBaseRegular mt-2 text-neutrals-400">
          Press fight button until your or your enemy power will end
        </p>
      </div>

      <div className=" max-w-1360 mx-auto mt-20">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            isOpen={isOpen}
            className="text-textBodyRegular font-roboto mb-12 "
          >
            {fightingPokemon?.name.english || "Select Pokemon"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative flex max-w-1360 mx-auto h-750  overflow-hidden">
        <img
          src="src/assets/battlebg.png"
          alt="Left background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
export default BattlePage;
