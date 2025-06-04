import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab } from "@/lib/types";

function BattlePage() {
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
        <div className="relative flex w-1440 h-full overflow-hidden">
            <img
              src="src/assets/battlebg.png"
              alt="Left background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
    </>
  );
}
export default BattlePage;
