import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/NavBar/";

function PokemonNavbar() {
  const [activeItem, setActiveItem] = useState<"all" | "my">("all");

  return (
    <NavigationMenu className="w-full bg-neutrals-white py-6">
      <div className="flex items-center justify-between max-w-1440 w-full mx-auto px-10">
        <NavigationMenuList className="flex items-center gap-4 ml-40">
          <img
            src="src/assets/pokemon_logo.png"
            alt="Pokemon"
            className="w-149.44 h-55"
          />

          <NavigationMenuItem>
            <button
              onClick={() => setActiveItem("all")}
              className={`w-120 h-38 rounded-s px-4 py-2 flex items-center text-bodyRegular text-primary-300 justify-center hover:underline ml-40 ${
                activeItem === "all" ? "bg-primary-50 text-bodyBold" : ""
              }`}
            >
              All Pokemons
            </button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <button
              onClick={() => setActiveItem("my")}
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