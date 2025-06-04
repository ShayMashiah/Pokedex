import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab } from "@/lib/types";
import { useLocation, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import pokemonData from "../data/pokemon_.json";

function PreBattlePage() {
  const [rivalPokemon, setRivalPokemon] = useState<any>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { selectedPokemon } = location.state || {};

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    const randomPokemon = pokemonData[randomIndex];
    setRivalPokemon(randomPokemon);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/battle");
    }, 3000);
    return () => clearTimeout(timeout); 
  }, []);

  if (!selectedPokemon) {
    return <div>No Pokémon selected!</div>;
  }

  return (
    <>
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
      <div className="relative flex justify-center items-center w-full mt-20">
        <div className="relative flex w-1440 h-755 overflow-hidden">
          <div className="relative w-1/2 h-full">
            <img
              src="src/assets/purplebg.jpg"
              alt="Left background"
              className="w-full h-full object-cover"
            />
            {selectedPokemon?.image && (
              <img
                src={selectedPokemon.image}
                alt="Selected Pokemon"
                className="absolute top-120 left-170 w-325 h-325 z-10"
              />
            )}
          </div>

          <div className="relative w-1/2 h-full">
            <img
              src="src/assets/bluebg.jpg"
              alt="Right background"
              className="w-full h-full object-cover"
            />
            {rivalPokemon && (
              <img
                src={rivalPokemon.image?.thumbnail}
                alt={rivalPokemon.name?.english}
                className="absolute bottom-120 right-170 w-325 h-325 z-10"
              />
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center mr-55">
            <span
              className="text-[130px] font-sans font-extrabold text-secondary-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              style={{ WebkitTextStroke: "3px white" }}
            >
              V
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center ml-55 mt-72">
            <span
              className="text-[130px] font-sans font-extrabold text-secondary-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              style={{ WebkitTextStroke: "3px white" }}
            >
              S
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default PreBattlePage;
