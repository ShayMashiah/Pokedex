import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Button } from "../Button/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { BattleResultModalProps } from "../../../lib/types";
import { Variant } from "../../../lib/constants";
import myPokemons from "../../../data/mypokemons_.json";

function BattleResultDialog({
  open,
  onOpenChange,
  title,
  imageSrc,
  primaryButtonLabel,
  onPrimaryAction,
  secondaryButtonLabel,
  onSecondaryAction,
  caughtPokemon,
  className,
}: BattleResultModalProps) {
  const [isPokemonDialogOpen, setIsPokemonDialogOpen] = useState(false);

  const ContinueBattleContent = () => (
    <>
      <div className="py-12 px-24 h-481">
        <DialogHeader>
          <DialogTitle className="text-pokemonModalTitle text-primary-500 font-mulish">
            {title}
          </DialogTitle>
        </DialogHeader>
      </div>
      <div className="w-454 h-158 px-183">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Result image"
            className="w-454 h-158 object-contain my-4 gap-5.5"
          />
        )}
      </div>
      <div className="px-16 pb-16">
        <div className="bg-neutrals-900  space-y-4 max-w-440 font-mulish text-left text-neutrals-500 max-h-147">
          <p className="text-headingMdBold text-neutrals-500 font-mulish pl-24 py-24">
            Rewards Earned
          </p>
          <div className="grid grid-cols-4 gap-30 px-24 max-h-143">
            <div className="flex flex-col ">
              <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                Speed
              </span>
              <span className="text-textBaseRegular text-neutrals-500 font-mulish pb-24">
                {caughtPokemon?.base.Speed}
              </span>
            </div>
            <div className="flex flex-col pl-20">
              <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                Category
              </span>
              <span className="text-textBaseRegular text-neutrals-500 font-mulish pb-24">
                {caughtPokemon?.type}
              </span>
            </div>
            <div className="flex flex-col pl-70">
              <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                Abilities
              </span>
              <span className="text-textBaseRegular  text-neutrals-500 font-mulish pb-24">
                {caughtPokemon?.profile?.ability?.[0]?.[0]
                  ?.split(",")[0]
                  ?.trim() ?? "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="flex justify-center border-t border-neutrals-light py-16 px-16">
        <div className="flex justify-center gap-16">
          <Button
            onClick={() => {
              if (primaryButtonLabel === "Switch Pokémon") {
                setIsPokemonDialogOpen(true);
              } else {
                onPrimaryAction();
              }
            }}
            size={
              primaryButtonLabel === "Battle Another Pokémon"
                ? "xxxl"
                : primaryButtonLabel === "Continue Battle"
                ? "xl"
                : "xxl"
            }
            variant="primary"
            className="text-subheadingRegular font-mulish text-neutrals-white"
          >
            {primaryButtonLabel}
          </Button>

          {secondaryButtonLabel && onSecondaryAction && (
            <Button variant="secondary" size="l" onClick={onSecondaryAction}>
              {secondaryButtonLabel}
            </Button>
          )}
        </div>
      </DialogFooter>
    </>
  );

  const DefaultContent = () => (
    <>
      <div className="py-12 px-24">
        <DialogHeader>
          <DialogTitle className="text-headingXLBold text-primary-500  font-mulish">
            {title}
          </DialogTitle>
        </DialogHeader>
      </div>

      <div className="pt-16 px-183">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Result image"
            className="w-134 h-142 object-contain my-4 gap-5.5"
          />
        )}
      </div>
      <DialogFooter className="flex justify-center border-t border-neutrals-light py-16 px-16">
        <div className="flex justify-center gap-16 ">
          <Button
            onClick={() => {
              if (primaryButtonLabel === "Switch Pokémon") {
                setIsPokemonDialogOpen(true);
              } else {
                onPrimaryAction();
              }
            }}
            size={
              primaryButtonLabel === "Battle Another Pokémon" ? "xxxl" : "xxl"
            }
            variant="primary"
            className="text-subheadingRegular font-mulish text-neutrals-white"
          >
            {primaryButtonLabel}
          </Button>

          {secondaryButtonLabel && onSecondaryAction && (
            <Button variant="secondary" size="l" onClick={onSecondaryAction}>
              {secondaryButtonLabel}
            </Button>
          )}
        </div>
      </DialogFooter>

      <Dialog open={isPokemonDialogOpen} onOpenChange={setIsPokemonDialogOpen}>
        <DialogContent
          variant={Variant.MyPokemons}
          pokemons={myPokemons.map((p) => ({
            id: p.id,
            name: p.name.english,
            image: p.image?.thumbnail ?? "",
            hires: p.image?.hires ?? "",
            description: p.description ?? "",
            height: p.profile?.height ?? "Unknown",
            attack: p.base?.Attack ?? 0,
            hp: p.base?.HP ?? 0,
            defense: p.base?.Defense ?? 0,
            speed: p.base?.Speed ?? 0,
            weight: p.profile?.weight ?? "Unknown",
            category: p.type ?? "Unknown",
            abilities:
              p.profile?.ability
                ?.map((a: string[]) => a[0].split(",")[0].trim())
                .join(", ") ?? "Unknown",
          }))}
        />
      </Dialog>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "text-center flex flex-col w-502 max-h-screen",
          primaryButtonLabel === "Continue Battle" ? "h-481" : "h-308",
          className
        )}
      >
        {primaryButtonLabel === "Continue Battle" ? (
          <ContinueBattleContent />
        ) : (
          <DefaultContent />
        )}
      </DialogContent>
    </Dialog>
  );
}

export { BattleResultDialog };
