import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/DropDown/dropdown-menu";
import { useState, useEffect } from "react";
import type { Pokemon, PokemonModal } from "@/lib/types";
import { useLocation } from "react-router-dom";
import BattleBackground from "@/assets/battlebg.png";
import { Progress } from "../components/ui/ProgressBar/progress";
import { FightButton } from "../components/ui/Button/FightButton";
import { motion } from "framer-motion";
import PokaballImg from "../assets/pokador.png";
import myPokemonsData from "../data/mypokemons_.json";

function BattlePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFainted, setIsFainted] = useState(false);
  const [triedToCatch, setTriedToCatch] = useState(false);

  const location = useLocation();
  const { selectedPokemon } = location.state || {};
  const { rivalPokemon } = location.state || {};
  const [enemyHp, setEnemyHp] = useState<number>(rivalPokemon.base.HP);
  const [myHp, setMyHp] = useState<number>(selectedPokemon.hp);
  const [fightingPokemon, setFightingPokemon] = useState<PokemonModal | null>(
    selectedPokemon
  );

  const messageColor = isFainted
    ? "text-extendedPalette-error-red"
    : "text-neutrals-500";
  const myPokemons = myPokemonsData as Pokemon[];
  const enemyDead = enemyHp === 0;
  const playerDead = myHp === 0;

  useEffect(() => {
    if ((enemyHp === 0 || myHp === 0) && !isFainted) {
      setIsFainted(true);
    }
  }, [enemyHp, myHp, isFainted]);

  useEffect(() => {
    if (selectedPokemon.speed >= rivalPokemon.base.Speed) {
      setPlayerTurn(true);
    } else {
      setPlayerTurn(false);
      enemyAttack();
    }
  }, []);

  function enemyAttack() {
    const enemyAttack = rivalPokemon.base.Attack;
    const playerDefense = selectedPokemon.defense;

    const damage =
      Math.floor(
        (((2 * 50) / 5 + 2) * 60 * (enemyAttack / playerDefense)) / 50 + 2
      ) *
      (Math.random() * (1 - 0.85) + 0.85);

    setTimeout(() => {
      setMyHp((prev) => Math.max(prev - Math.floor(damage), 0));
      setPlayerTurn(true);
      setTriedToCatch(false);
    }, 1000);
  }

  let turnMessage = "";

  if (
    !playerTurn &&
    !isGameOver &&
    enemyHp === rivalPokemon.base.HP &&
    myHp === selectedPokemon.hp
  ) {
    turnMessage = `${rivalPokemon.name.english} starts the fight!`;
  } else if (
    playerTurn &&
    !isGameOver &&
    enemyHp === rivalPokemon.base.HP &&
    myHp === selectedPokemon.hp
  ) {
    turnMessage = `${selectedPokemon.name} starts the fight!`;
  } else if (isCaught) {
    turnMessage = `You caught ${rivalPokemon.name.english}!`;
  } else if (
    triedToCatch &&
    !isCaught &&
    enemyHp > 33 &&
    myHp > 0 &&
    playerTurn
  ) {
    turnMessage = `You can’t catch ${rivalPokemon.name.english} yet.`;
  } else if (enemyHp === 0) {
    turnMessage = `Critical hit! ${rivalPokemon.name.english} fainted!`;
  } else if (myHp === 0) {
    turnMessage = `Critical hit! ${selectedPokemon.name} fainted!`;
  } else {
    const currentPokemonName = playerTurn
      ? selectedPokemon.name
      : rivalPokemon.name.english;
    turnMessage = `${currentPokemonName} attacks!`;
  }

  return (
    <div className="bg-neutrals-100 h-screen">
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

      <div className=" max-w-1360 mx-auto  mt-20">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            isOpen={isOpen}
            className="text-textBodyRegular font-roboto mb-12 "
          >
            {fightingPokemon?.name || "Select Pokemon"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {myPokemons.map((pokemon) => (
              <DropdownMenuItem
                key={pokemon.id}
                onSelect={() => {
                  const converted = {
                    id: pokemon.id,
                    image: pokemon.image.thumbnail,
                    name: pokemon.name.english,
                    type: pokemon.type,
                    attack: pokemon.base.Attack,
                    defense: pokemon.base.Defense,
                    speed: pokemon.base.Speed,
                    hp: pokemon.base.HP,
                    hires: pokemon.image.hires,
                  };

                  setFightingPokemon(converted);
                  setMyHp(converted.hp);
                  setIsOpen(false);
                }}
              >
                {pokemon.name.english}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative flex max-w-1360 mx-auto h-750 overflow-hidden">
        <div
          className={
            "absolute top-90 left-1 w-633 h-119 px-[25px] py-[24px] rounded-tr-[12px] rounded-br-[12px] border-t-[5px] border-r-[5px] border-b-[5px] border-l-0 border-solid [border-image-source:theme(backgroundImage.gradient-default)] [border-image-slice:1]  backdrop-blur-sm bg-white/30 z-10 flex items-center"
          }
        >
          <p className={`${messageColor} text-headingLgBold font-mulish`}>
            {turnMessage}
          </p>
        </div>

        <img
          src={BattleBackground}
          alt="Background"
          className="w-full h-full object-cover"
        />

        <motion.img
          src={selectedPokemon.hires}
          alt="Pokemon Left"
          className="absolute bottom-158 left-234 w-235 h-239"
          initial={{ scale: 1 }}
          animate={
            playerDead
              ? {
                  rotate: [0, 10, -10, 10, -90],
                  y: [0, 10, 20, 30, 60],
                  opacity: [1, 1, 1, 1, 0.7],
                  transition: { duration: 1 },
                }
              : { scale: 1, opacity: 1, y: 0 }
          }
        />

        <Progress
          name={selectedPokemon.name}
          speed={selectedPokemon.speed}
          currentHP={myHp}
          maxHP={selectedPokemon.hp}
          isTurn={playerTurn}
          isFainted={playerDead}
          className="absolute bottom-24 left-24"
        />

        <motion.img
          src={rivalPokemon.image?.hires}
          alt="Pokemon Right"
          className="absolute top-101 right-270 w-235 h-239"
          initial={{ scale: 1 }}
          animate={
            isCaught
              ? {
                  scale: [1, 0.9, 0.7, 0.5, 0.3],
                  opacity: [1, 0.8, 0.6, 0.4, 0],
                  y: [0, -10, -30, -60, -80],
                  transition: { duration: 0.8 },
                }
              : enemyDead
              ? {
                  rotate: [0, -10, 10, -10, 90],
                  y: [0, 10, 20, 30, 60],
                  opacity: [1, 1, 1, 1, 0.7],
                  transition: { duration: 1 },
                }
              : { scale: 1, opacity: 1, y: 0 }
          }
        />

        {isCaught && (
          <motion.img
            src={PokaballImg}
            alt="Pokeball"
            className="absolute top-101 right-295 w-206 h-206"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.6 } }}
          />
        )}

        <Progress
          name={rivalPokemon.name.english}
          speed={rivalPokemon.base.Speed}
          currentHP={enemyHp}
          maxHP={rivalPokemon.base.HP}
          isTurn={!playerTurn}
          isFainted={enemyDead}
          className="absolute top-24 right-24"
        />

        <div className="absolute bottom-24 right-24  flex gap-24 p-4">
          <FightButton
            type="attack"
            attackerAttack={selectedPokemon.attack}
            defenderDefense={rivalPokemon.base.Defense}
            onAttack={(damage) => {
              const newHp = Math.max(enemyHp - damage, 0);
              setEnemyHp(newHp);

              if (newHp === 0) {
                setIsGameOver(true);
                return;
              }

              setPlayerTurn(false);
              enemyAttack();
            }}
            disabled={!playerTurn || isGameOver || myHp === 0}
          />
          <FightButton
            type="catch"
            targetHp={enemyHp}
            onCatchSuccess={() => {
              setIsCaught(true);
              setIsGameOver(true);
            }}
            onCatchFail={() => {
              setTriedToCatch(true);
            }}
            disabled={!playerTurn || isCaught || isGameOver || myHp === 0}
          />
        </div>
      </div>
    </div>
  );
}
export default BattlePage;
