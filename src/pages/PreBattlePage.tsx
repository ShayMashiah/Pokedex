import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab, type Pokemon } from "@/lib/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pokemonData from "../data/pokemon_.json";
import background from "../assets/Background.png";

function PreBattlePage() {
  const [rivalPokemon, setRivalPokemon] = useState<Pokemon | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { selectedPokemon } = location.state || {};

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    const randomPokemon = pokemonData[randomIndex] as Pokemon;
    setRivalPokemon(randomPokemon);
  }, []);

  useEffect(() => {
    if (!rivalPokemon) return;

    const timeout = setTimeout(() => {
      navigate("/battle", { state: { selectedPokemon, rivalPokemon } });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [rivalPokemon, selectedPokemon]);

  if (!selectedPokemon) {
    return <div>No Pokémon selected!</div>;
  }

  return (
    <div className="bg-neutrals-100 mx-auto min-h-screen ">
      <PokemonNavbar
        activeItem={Tab.Null}
        onChange={() => console.log("Battle mode")}
      />
      <div className="max-w-1360  mx-auto">
        <div className=" text-center mt-48 mb-6">
          <h1 className="text-headingXXLgBold font-mulish text-neutrals-400">
            Fighting Arena
          </h1>
          <p className="text-textBaseRegular font-mulish mt-2 text-neutrals-400">
            Press fight button until your or your enemy power will end
          </p>
        </div>
        <div className="relative flex justify-center items-center w-full mt-24">
          <div className="relative flex h-755 w-full overflow-hidden">
            <img
              src={background}
              alt="Battle Background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {selectedPokemon?.image && (
              <img
                src={selectedPokemon.hires}
                alt="Selected Pokemon"
                className="absolute top-82 left-130 z-10"
              />
            )}

            {rivalPokemon && (
              <img
                src={rivalPokemon.image?.hires}
                alt={rivalPokemon.name?.english}
                className="absolute bottom-82 right-130 z-10"
              />
            )}
          </div>
          ;
        </div>
      </div>
    </div>
  );
}
export default PreBattlePage;
