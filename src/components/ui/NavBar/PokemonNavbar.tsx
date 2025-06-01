import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/NavBar/";
import type { PokemonNavbarProps } from "../../../lib/types";

function PokemonNavbar({ activeItem, onChange }: PokemonNavbarProps) {
  return (
    <NavigationMenu className="w-full max-w-screen bg-neutrals-white py-6 shadow-sm  pl-128">
      <div className="w-full mx-auto flex items-center justify-between">
        <NavigationMenuList className="flex items-center ">
          <img
            src="src/assets/pokemon_logo.png"
            alt="Pokemon"
            className="w-149.44 h-55"
          />

          <NavigationMenuItem>
            <button
              onClick={() => onChange("all")}
              className={`w-120 h-38 rounded-s px-4 py-2 flex items-center text-bodyRegular text-primary-300 justify-center hover:underline ml-40 ${
                activeItem === "all" ? "bg-primary-50 text-bodyBold" : ""
              }`}
            >
              All Pokemons
            </button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <button
              onClick={() => onChange("my")}
              className={`w-120 h-38 rounded-s px-4 py-2 flex items-center text-bodyRegular  text-primary-300 justify-center hover:underline ml-20 ${
                activeItem === "my" ? "bg-primary-50 text-bodyBold" : ""
              }`}
            >
              My Pokemons
            </button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}

export default PokemonNavbar;
