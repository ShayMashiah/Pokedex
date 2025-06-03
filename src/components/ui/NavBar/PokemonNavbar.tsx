import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/NavBar/";
import type { PokemonNavbarProps } from "../../../lib/types";
import { Tab } from "../../../lib/types";
import PokemonLogo from "@/assets/pokemon_logo.png";
import { Variant } from "../../../lib/types";
import { Dialog, DialogContent, DialogTrigger } from "../Dialog/dialog";
import { Button } from "../Button/button";
import myPokemonsData from "../../../data/mypokemons_.json";
import type { PokemonModal } from "../../../lib/types";

function PokemonNavbar({ activeItem, onChange }: PokemonNavbarProps) {
  const myPokemons: PokemonModal[] = myPokemonsData.map((p) => ({
    id: p.id,
    name: p.name.english,
    image: p.image.thumbnail,
  }));

  return (
    <NavigationMenu className="w-full max-w-screen bg-neutrals-white py-6 shadow-sm  pl-128">
      <div className="w-full mx-auto flex items-center justify-between">
        <NavigationMenuList className="flex items-center ">
          <img src={PokemonLogo} alt="Pokemon" className="w-149.44 h-55" />

          <NavigationMenuItem>
            <button
              onClick={() => onChange(Tab.All)}
              className={`w-120 h-38 rounded-s px-4 py-2 flex items-center text-bodyRegular text-primary-300 justify-center hover:underline ml-40 ${
                activeItem === Tab.All ? "bg-primary-50 text-bodyBold" : ""
              }`}
            >
              All Pokemons
            </button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <button
              onClick={() => onChange(Tab.User)}
              className={`w-120 h-38 rounded-s px-4 py-2 flex items-center text-bodyRegular  text-primary-300 justify-center hover:underline ml-20 ${
                activeItem === Tab.User ? "bg-primary-50 text-bodyBold" : ""
              }`}
            >
              My Pokemons
            </button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary" size="xlg" className="mr-153">
              Start a fight
            </Button>
          </DialogTrigger>
          <DialogContent
            variant={Variant.MyPokemons}
            pokemons={myPokemons}
            onSelectPokemon={(id) => alert("Selected Pokémon ID: " + id)}
          />
        </Dialog>
      </div>
    </NavigationMenu>
  );
}

export default PokemonNavbar;
