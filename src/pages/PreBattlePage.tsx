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
    <div className="bg-neutrals-100 mx-auto min-h-screen">
      <PokemonNavbar
        activeItem={Tab.Null}
        onChange={() => console.log("Battle mode")}
      />
      <div className="px-40 py-45">
        <div className=" text-center mb-6">
          <h1 className="text-headingXXLgBold font-mulish text-neutrals-400">
            Fighting Arena
          </h1>
          <p className="text-textBaseRegular font-mulish mt-2 text-neutrals-400">
            Press fight button until your or your enemy power will end
          </p>
        </div>
        <div className="relative flex justify-center items-center w-full mt-24">
          <div className="relative flex h-755 min-w-1360 overflow-hidden">
            <div className="relative w-1/2 min-w-680 h-full">
              <img
                src={leftBackground}
                alt="Left background"
                className="w-full  h-full object-cover"
              />
              {selectedPokemon?.image && (
                <img
                  src={selectedPokemon.hires}
                  alt="Selected Pokemon"
                  className="absolute z-10"
                  style={{
                    top: "17%",
                    left: "28%",
                    width: "auto",
                    height: "auto",
                  }}
                />
              )}
            </div>

            <div className="relative w-1/2 min-w-680  h-full">
              <img
                src={rightBackground}
                alt="Right background"
                className="w-full h-full object-cover"
              />
              {rivalPokemon && (
                <img
                  src={rivalPokemon.image?.hires}
                  alt={rivalPokemon.name?.english}
                  className="absolute z-10"
                  style={{
                    bottom: "17%",
                    right: "28%",
                    width: "auto",
                    height: "auto",
                  }}
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
