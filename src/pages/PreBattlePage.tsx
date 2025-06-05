import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab, type Pokemon } from "@/lib/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pokemonData from "../data/pokemon_.json";
import rightBackground from "@/assets/bluebg.jpg";
import leftBackground from "@/assets/purplebg.jpg";

function PreBattlePage() {
  const [rivalPokemon, setRivalPokemon] = useState<Pokemon | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { selectedPokemon } = location.state || {};

  console.log("Selected Pokemon:", selectedPokemon);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    const randomPokemon = pokemonData[randomIndex] as Pokemon;
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
    <div className="max-w-1440 mx-auto max-h-1024">
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
          <div className="relative flex h-755 overflow-hidden">
            <div className="relative w-1/2 h-full">
              <img
                src={leftBackground}
                alt="Left background"
                className="w-full h-full object-cover"
              />
              {selectedPokemon?.image && (
                <img
                  src={selectedPokemon.hires}
                  alt="Selected Pokemon"
                  className="absolute top-82 left-130 z-10"
                />
              )}
            </div>

            <div className="relative w-1/2 h-full">
              <img
                src={rightBackground}
                alt="Right background"
                className="w-full h-full object-cover"
              />
              {rivalPokemon && (
                <img
                  src={rivalPokemon.image?.hires}
                  alt={rivalPokemon.name?.english}
                  className="absolute bottom-82 right-130  z-10"
                />
              )}
            </div>

            <div className="absolute w-75 h-100 inset-0 flex items-center justify-center mr-55">
              <span
                className="text-[130px] font-sans font-extrabold text-secondary-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                style={{ WebkitTextStroke: "3px white" }}
              >
                V
              </span>
            </div>
            <div className="absolute w-75 h-100 inset-0 flex items-center justify-center ml-55 mt-72">
              <span
                className="text-[130px] font-sans font-extrabold text-secondary-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                style={{ WebkitTextStroke: "3px white" }}
              >
                S
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PreBattlePage;
