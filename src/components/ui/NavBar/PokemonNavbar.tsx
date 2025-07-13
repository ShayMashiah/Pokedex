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
import type { PokemonModal } from "@/lib/types";
import { transformToPokemonModal } from "@/lib/utils/mapMyPokemons";
import { useUserPokemons } from "@/lib/hooks/useUserPokemons";
import PokeballIcon from "@/assets/pokador.png";
import { useLocation } from "react-router-dom";

function PokemonNavbar({
  activeItem,
  onChange,
  sortBy = "id",
  order = "asc",
}: PokemonNavbarProps) {
  const { data: userPokemonsData } = useUserPokemons(1, 0, "", sortBy, order);
  const pokemonsData: PokemonModal[] =
    userPokemonsData?.data.map(transformToPokemonModal) || [];
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="w-full bg-neutrals-white">
      <NavigationMenu className="max-w-1440 mx-auto py-12 px-40 ">
        <div className="w-full mx-auto flex items-center justify-between">
          <NavigationMenuList className="flex items-center ">
            <Link
              to="/"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <img src={PokemonLogo} alt="Pokemon" className="w-149.44 h-55" />
            </Link>

            {isHomePage && (
              <>
                <NavigationMenuItem>
                  <button
                    data-cy="tab-all-pokemons"
                    onClick={() => onChange(Tab.All)}
                    className={`w-120 h-38 rounded-s px-4 py-2 flex items-center text-bodyRegular text-primary-300 justify-center hover:bg-primary-50 ml-40 ${
                      activeItem === Tab.All
                        ? "bg-primary-50 font-bold font-mulish"
                        : ""
                    }`}
                  >
                    All Pokemons
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem className="ml-16">
                  <button
                    data-cy="tab-my-pokemons"
                    onClick={() => onChange(Tab.User)}
                    className={`w-155 h-38 rounded-s flex items-center justify-center px-4 py-2 text-bodyRegular text-primary-300 hover:bg-primary-50 ${
                      activeItem === Tab.User
                        ? "bg-primary-50 font-bold font-mulish"
                        : ""
                    }`}
                  >
                    My Pokemons
                    <img
                      src={PokeballIcon}
                      alt="pokeball-icon"
                      className="w-24 h-24 pl-4"
                    />
                  </button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </div>

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                size="xlg"
                className="text-subheadingRegular font-mulish text-neutrals-white"
                data-cy="start-fight-button"
              >
                Start a Fight
              </Button>
            </DialogTrigger>
            <DialogContent
              variant={Variant.MyPokemons}
              pokemons={pokemonsData}
              onInteractOutside={(e) => e.preventDefault()}
            />
          </Dialog>
        </div>
      </NavigationMenu>
    </div>
  );
}

export default PokemonNavbar;
