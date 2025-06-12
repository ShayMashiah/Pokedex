import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/NavBar/";
import type { PokemonNavbarProps } from "../../../lib/types";
import { Tab } from "../../../lib/types";
import PokemonLogo from "@/assets/pokemon_logo.png";
import { Variant } from "../../../lib/constants";
import { Dialog, DialogContent, DialogTrigger } from "../Dialog/dialog";
import { Button } from "../Button/button";
import { Link } from "react-router-dom";
import { useMyPokemon } from "@/context/MyPokemonContext";
import allPokemons from "@/data/pokemon_.json";
import type { PokemonModal } from "@/lib/types";
import { transformToPokemonModal } from "@/lib/utils/mapMyPokemons";

function PokemonNavbar({ activeItem, onChange }: PokemonNavbarProps) {
  const { myPokemons } = useMyPokemon();

  const pokemonsData: PokemonModal[] = myPokemons
    .map((id) => {
      const poke = allPokemons.find((p) => p.id === id);
      return poke ? transformToPokemonModal(poke) : null;
    })
    .filter((pokemon): pokemon is PokemonModal => pokemon !== null);

  return (
    <div className=" bg-neutrals-white max-w-full">
      <NavigationMenu className="py-12 px-40">
        <div className="w-full mx-auto flex items-center justify-between">
          <NavigationMenuList className="flex items-center ">
            <Link to="/">
              <img src={PokemonLogo} alt="Pokemon" className="w-149.44 h-55" />
            </Link>

            <NavigationMenuItem>
              <button
                onClick={() => onChange(Tab.All)}
                className={`w-120 h-38 rounded-s px-4 py-2 flex items-center text-bodyRegular text-primary-300 justify-center hover:bg-primary-50 ml-40 ${
                  activeItem === Tab.All
                    ? "bg-primary-50 font-bold text-bodyRegular"
                    : ""
                }`}
              >
                All Pokemons
              </button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <button
                onClick={() => onChange(Tab.User)}
                className={`w-120 h-38 rounded-s flex items-center text-bodyRegular text-primary-300 justify-center  hover:bg-primary-50 ml-16   ${
                  activeItem === Tab.User
                    ? "bg-primary-50 font-bold text-bodyRegular"
                    : ""
                }`}
              >
                My Pokemons
              </button>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="primary"
                  size="xlg"
                  className="text-subheadingRegular font-mulish text-neutrals-white"
                >
                  Start a Fight
                </Button>
              </DialogTrigger>
              <DialogContent
                variant={Variant.MyPokemons}
                pokemons={pokemonsData}
              />
            </Dialog>
          </div>
        </div>
      </NavigationMenu>
    </div>
  );
}

export default PokemonNavbar;
