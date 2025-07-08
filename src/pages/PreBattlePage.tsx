import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab } from "@/lib/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import background from "../assets/Background.png";
import { usePokemonById } from "@/lib/hooks/usePokemonById";
import { DATA_LENGTH } from "@/lib/constants";

function PreBattlePage() {
  const [rivalId, setRivalId] = useState<number>(1);

  const navigate = useNavigate();

  const location = useLocation();
  const { selectedPokemon } = location.state || {};

  const { data: newRivalPokemon } = usePokemonById(rivalId);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * DATA_LENGTH) + 1;
    setRivalId(randomId);
  }, []);

  useEffect(() => {
    if (!newRivalPokemon) return;

    const timeout = setTimeout(() => {
      navigate("/battle", { state: { selectedPokemon, newRivalPokemon } });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [newRivalPokemon, selectedPokemon]);

  if (!selectedPokemon) {
    return <div>No Pokémon selected!</div>;
  }

  return (
    <div className="bg-neutrals-100 mx-auto min-h-screen ">
      <PokemonNavbar
        activeItem={Tab.Null}
        onChange={() => console.log("Battle mode")}
      />
      <div className="max-w-1360  mx-auto ">
        <div className=" text-center mt-36 mb-6">
          <h1 className="text-headingXXLgBold font-mulish text-neutrals-400">
            Fighting arena
          </h1>
          <p className="text-textBaseRegular font-mulish mt-8 text-neutrals-400">
            Press fight button until your or your enemy power will end
          </p>
        </div>
        <div className="relative flex justify-center items-center w-full mt-24">
          <div className="relative flex h-755 w-full overflow-hidden mb-40">
            <img
              src={background}
              alt="Battle Background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {selectedPokemon?.image && (
              <img
                data-cy="battle-left-pokemon"
                src={selectedPokemon.hires}
                alt={selectedPokemon.name}
                className="absolute top-82 left-130 z-10"
              />
            )}

            {newRivalPokemon && (
              <img
                src={newRivalPokemon.image?.hires}
                alt={newRivalPokemon.name?.english}
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
