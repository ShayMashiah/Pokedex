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
          <div className="relative flex h-755 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-20">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1363 754"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block"
              >
                <polyline
                  points="
                      1363,0
                      1250,150
                      1050,180
                      850,350
                      750,400
                      650,400
                      550,400
                      450,500
                      350,500
                      250,500
                      0,754
                      0,0"
                  stroke="white"
                  strokeWidth="11"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  filter="drop-shadow(0 4px 4px rgba(0,0,0,0.25))"
                />
              </svg>
            </div>

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

            <div className="absolute w-75 h-100 inset-0 flex items-center justify-center leading-[48px] mr-55 z-20">
              <span
                className="text-[130px] font-sans font-extrabold  text-secondary-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                style={{ WebkitTextStroke: "3px white" }}
              >
                V
              </span>
            </div>
            <div className="absolute w-75 h-100 inset-0 flex items-center justify-center leading-[48px] ml-55 mt-72 z-20">
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
