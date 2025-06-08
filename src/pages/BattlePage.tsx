import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/DropDown/dropdown-menu";
import { useState } from "react";
import type { Pokemon, PokemonModal } from "@/lib/types";
import { useLocation } from "react-router-dom";
import BattleBackground from "@/assets/battlebg.png";
import { Progress } from "../components/ui/ProgressBar/progress";
import { FightButton } from "../components/ui/Button/FightButton";


function BattlePage() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { selectedPokemon } = location.state || {};
  const { rivalPokemon } = location.state || {};

  const [fightingPokemon, setFightingPokemon] = useState<PokemonModal | null>(
    selectedPokemon
  );

  console.log("Fighting Pokemon:", fightingPokemon);

  return (
    <div className="bg-neutrals-100 h-screen">
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

      <div className=" max-w-1360 mx-auto  mt-20">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            isOpen={isOpen}
            className="text-textBodyRegular font-roboto mb-12 "
          >
            {fightingPokemon?.name || "Select Pokemon"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative flex max-w-1360 mx-auto h-750 overflow-hidden">
        <img
          src={BattleBackground}
          alt="Background"
          className="w-full h-full object-cover"
        />

        <img
          src={selectedPokemon.hires}
          alt="Pokemon Left"
          className="absolute bottom-158 left-234 w-64 h-auto"
        />
        <Progress
          name={selectedPokemon.name}
          speed={selectedPokemon.speed}
          currentHP={selectedPokemon.hp}
          maxHP={selectedPokemon.hp}
          className="absolute bottom-24 left-24"
        />

        <img
          src={rivalPokemon.image?.hires}
          alt="Pokemon Right"
          className="absolute top-101 right-270 w-64 h-auto"
        />
        <Progress
          name={rivalPokemon.name.english}
          speed={rivalPokemon.base.Speed}
          currentHP={rivalPokemon.base.HP}
          maxHP={rivalPokemon.base.HP}
          className="absolute top-24 right-24"
        />

        <div className="absolute bottom-24 right-24  flex gap-24 p-4">
          <FightButton
            type="attack"
          />
          <FightButton type="catch"  />
        </div>
      </div>
    </div>
  );
}
export default BattlePage;
