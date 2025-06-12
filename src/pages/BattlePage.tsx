import PokemonNavbar from "@/components/ui/NavBar/PokemonNavbar";
import { Tab } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/DropDown/dropdown-menu";
import { BattleResultDialog } from "@/components/ui/Dialog/BattleResultDialog";
import { useState, useEffect, useMemo } from "react";
import type { Pokemon, PokemonModal } from "@/lib/types";
import { useLocation, useNavigate } from "react-router-dom";
import BattleBackground from "@/assets/battlebg.png";
import { Progress } from "../components/ui/ProgressBar/progress";
import { FightButton } from "../components/ui/Button/FightButton";
import { motion } from "framer-motion";
import PokaballImg from "../assets/pokador.png";
import pokemonData from "../data/pokemon_.json";
import { buttonsVariant } from "../../src/lib/constants";
import { TURN_MESSAGES } from "@/lib/constants";
import type { TurnMessageParams } from "@/lib/constants";
import { useMyPokemon } from "@/context/MyPokemonContext";
import { cn } from "@/lib/utils";

function BattlePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFainted, setIsFainted] = useState(false);
  const [triedToCatch, setTriedToCatch] = useState(false);
  const [playerDead, setPlayerDead] = useState(false);
  const [enemyDead, setEnemyDead] = useState(false);
  const [deadPokemons, setDeadPokemons] = useState<number[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPokemon } = location.state || {};
  const { rivalPokemon: initialRivalPokemon } = location.state || {};
  const [rivalPokemon, setRivalPokemon] =
    useState<Pokemon>(initialRivalPokemon);
  const [usedPokemons, setUsedPokemons] = useState<number[]>([
    selectedPokemon.id,
  ]);

  const [enemyHp, setEnemyHp] = useState<number>(rivalPokemon.base.HP);
  const [myHp, setMyHp] = useState<number>(selectedPokemon.hp);
  const [fightingPokemon, setFightingPokemon] =
    useState<PokemonModal>(selectedPokemon);
  const [showResultModal, setShowResultModal] = useState(false);

  const messageColor = isFainted
    ? "text-extendedPalette-error-red"
    : "text-neutrals-500";

  const { myPokemons, addPokemon } = useMyPokemon();

  function generateNewRivalPokemon() {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    const newRival = pokemonData[randomIndex] as Pokemon;
    setRivalPokemon(newRival);
    setEnemyHp(newRival.base.HP);
  }

  useEffect(() => {
    const dead = myHp === 0;
    setPlayerDead(dead);
    if (dead) {
      setShowResultModal(true);
      setDeadPokemons((prev) => [...prev, fightingPokemon.id]);
    }
  }, [myHp, fightingPokemon.id]);

  useEffect(() => {
    const dead = enemyHp === 0;
    setEnemyDead(dead);
    if (dead) setShowResultModal(true);
  }, [enemyHp]);

  useEffect(() => {
    const dead = myHp === 0;
    setPlayerDead(dead);
    if (dead) setShowResultModal(true);
  }, [myHp, fightingPokemon.id]);

  useEffect(() => {
    if (isCaught) {
      setShowResultModal(true);
    }
  }, [isCaught]);

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

  const myPokemonModels = useMemo(() => {
    return pokemonData
      .filter((p) => myPokemons.includes(p.id))
      .map((pokemon) => ({
        id: pokemon.id,
        image: pokemon.image.thumbnail,
        name: pokemon.name.english,
        type: pokemon.type,
        attack: pokemon.base.Attack,
        defense: pokemon.base.Defense,
        speed: pokemon.base.Speed,
        hp: pokemon.base.HP,
        hires: pokemon.image.hires,
      }));
  }, [pokemonData, myPokemons]);

  const params: TurnMessageParams = {
    playerTurn,
    isGameOver,
    enemyHp,
    rivalHp: rivalPokemon.base.HP,
    myHp,
    selectedHp: selectedPokemon.hp,
    triedToCatch,
    isCaught,
    rivalName: rivalPokemon.name.english,
    playerName: fightingPokemon.name,
    currentName: playerTurn ? fightingPokemon.name : rivalPokemon.name.english,
  };

  const matchedMessage = TURN_MESSAGES.find((msg) => msg.condition(params));
  let turnMessage = matchedMessage?.getMessage(params) ?? "";

  return (
    <div className="bg-neutrals-100  min-h-screen">
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

      <div className="px-40">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            isOpen={isOpen}
            className="text-textBodyRegular font-roboto mb-12 w-300"
          >
            {fightingPokemon?.name || "Select Pokemon"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="py-8 px-8">
              <div className="flex items-center justify-between w-258 h-35 bg-primary-50">
                <span className="text-captionRegular pl-8 font-mulish text-primary-400  h-19">
                  Pokemon’s can be switched <strong>once</strong> in battle.
                </span>
              </div>
            </DropdownMenuItem>
            {myPokemonModels.map((pokemon) => {
              const isDead = deadPokemons.includes(pokemon.id);
              const isAlreadyUsed = usedPokemons.includes(pokemon.id);
              const isDisabled = isDead || isAlreadyUsed;

              return (
                <DropdownMenuItem
                  key={pokemon.id}
                  onSelect={() => {
                    if (isDisabled) return;
                    setIsOpen(false);
                    setIsFainted(false);
                    setIsGameOver(false);
                    setPlayerDead(false);
                    setFightingPokemon(pokemon);
                    setMyHp(pokemon.hp);
                    setUsedPokemons((prev) => [...prev, pokemon.id]);
                  }}
                  className={cn(
                    "w-255 h-46 cursor-pointer py-8 px-8",
                    isDisabled && "pointer-events-none opacity-40"
                  )}
                >
                  <div className="flex flex-row items-center justify-between gap-4 w-full">
                    <div className="flex flex-row gap-4">
                      <div className="bg-neutrals-900 rounded-full w-32 h-32 overflow-hidden flex items-center justify-center">
                        <img
                          src={pokemon.image}
                          alt={pokemon.name}
                          className="w-28 h-28 ml-2"
                        />
                      </div>
                      <div className="flex flex-col w-67 h-38">
                        <span className="text-bodyMedium font-mulish text-neutrals-500">
                          {pokemon.name}
                        </span>
                        <span className="text-xSmallRegular font-mulish text-primary-300">
                          Speed {pokemon.speed}
                        </span>
                      </div>
                    </div>
                    <div className="w-51 h-19 mr-8">
                      <span className="text-captionBold font-mulish text-neutrals-500">
                        Pwr. {pokemon.attack}
                      </span>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative flex px-40 pb-40 mx-auto ">
        <div
          className={
            "absolute top-90 left-41 w-633 h-119 px-[25px] py-[24px] rounded-tr-[12px] rounded-br-[12px] border-t-[5px] border-r-[5px] border-b-[5px] border-l-0 border-solid [border-image-source:theme(backgroundImage.gradient-default)] [border-image-slice:1]  backdrop-blur-sm bg-white/30 z-10 flex items-center"
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
          key={fightingPokemon.id}
          src={fightingPokemon.hires}
          alt="Pokemon Left"
          className="absolute"
          style={{ bottom: "20%", left: "20%", width: "15vw", height: "auto" }}
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
          name={fightingPokemon.name}
          speed={fightingPokemon.speed ?? 0}
          currentHP={myHp}
          maxHP={fightingPokemon.hp ?? 0}
          isTurn={playerTurn}
          isFainted={playerDead}
          className="absolute bottom-64 left-64"
        />

        <motion.img
          key={rivalPokemon.id}
          src={rivalPokemon.image?.hires}
          alt="Pokemon Right"
          className="absolute"
          style={{ top: "15%", right: "20%", width: "15vw", height: "auto" }}
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
            className="absolute"
            style={{ top: "15%", right: "20%", width: "15vw", height: "auto" }}
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
          className="absolute top-24 right-64"
        />

        {playerTurn && !playerDead && !enemyDead && !isGameOver && (
          <div className="absolute bottom-64 right-64 flex gap-24 p-4">
            <FightButton
              type={buttonsVariant.Attack}
              attackerAttack={fightingPokemon.attack}
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
            />
            <FightButton
              type={buttonsVariant.Catch}
              targetHp={enemyHp}
              onCatchSuccess={() => {
                setIsCaught(true);
                addPokemon(rivalPokemon.id);
                setIsGameOver(true);
              }}
              onCatchFail={() => {
                setTriedToCatch(true);
              }}
            />
          </div>
        )}
      </div>
      <BattleResultDialog
        open={showResultModal}
        onOpenChange={setShowResultModal}
        title={
          isCaught ? (
            <span className="flex items-center gap-2">
              You caught {rivalPokemon.name.english}!
              <img
                src={PokaballImg}
                alt="pokeball"
                className="ml-10 w-24 h-24"
              />
            </span>
          ) : playerDead ? (
            `${fightingPokemon.name} lost the match`
          ) : enemyDead ? (
            `You won ${rivalPokemon.name.english}!`
          ) : (
            ``
          )
        }
        imageSrc={
          isCaught
            ? rivalPokemon.image?.hires
            : playerDead
            ? fightingPokemon.hires
            : enemyDead
            ? rivalPokemon.image?.hires
            : undefined
        }
        primaryButtonLabel={
          isCaught
            ? "Continue Battle"
            : enemyDead
            ? "Battle Another Pokémon"
            : "Switch Pokémon"
        }
        onPrimaryAction={() => {
          setShowResultModal(false);
          setIsCaught(false);
          setIsFainted(false);
          setIsGameOver(false);
          setPlayerDead(false);
          setEnemyDead(false);
          setPlayerTurn(true);

          if (isCaught) {
            generateNewRivalPokemon();
          } else if (enemyDead) {
            generateNewRivalPokemon();
          } else {
            setEnemyHp(rivalPokemon.base.HP);
          }
        }}
        secondaryButtonLabel="End Match"
        onSecondaryAction={() => {
          navigate("/");
        }}
        caughtPokemon={isCaught ? rivalPokemon : undefined}
      />
    </div>
  );
}
export default BattlePage;
