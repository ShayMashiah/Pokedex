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
import myPokemons from "@/data/mypokemons_.json";
import type { PokemonSummary } from "@/lib/types";

interface SwitchPokemonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchPokemon: (pokemon: PokemonSummary) => void;
  className?: string;
}

function SwitchPokemonDialog({
  open,
  onOpenChange,
  onSwitchPokemon,
  className,
}: SwitchPokemonDialogProps) {
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null
  );

  const pokemons = myPokemons.map((p) => ({
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
  }));

  const handleStartBattle = () => {
    const selected = pokemons.find((p) => p.id === selectedPokemonId);
    if (!selected) return;
    onSwitchPokemon(selected);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "text-center flex flex-col w-502 h-fit max-h-screen",
          className
        )}
      >
        <DialogHeader className="items-start border-neutrals-light font-mulish">
          <DialogTitle className="font-mulish !text-headingLgMedium text-neutrals-500 py-24 px-10">
            Choose the Pokemon to battle with
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2 justify-items-center">
          {pokemons.slice(0, 6).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPokemonId(p.id)}
              className={cn(
                "rounded-full border-2 mt-16",
                selectedPokemonId === p.id
                  ? "border-blue-500"
                  : "border-transparent hover:border-blue-500",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              )}
            >
              <div className="bg-neutrals-900 w-102.35 h-102.35 rounded-full flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="object-cover w-76 h-76"
                />
              </div>
            </button>
          ))}
        </div>

        {pokemons.length > 6 && (
          <div className="flex justify-center gap-76 pt-10">
            {pokemons.slice(6).map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPokemonId(p.id)}
                className={cn(
                  "rounded-full border-2",
                  selectedPokemonId === p.id
                    ? "border-blue-500"
                    : "border-transparent hover:border-blue-500",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                )}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-102.35 h-102.35 rounded-full"
                />
              </button>
            ))}
          </div>
        )}

        <DialogFooter className="flex justify-center border-t border-neutrals-light pt-16">
          <Button
            variant="primary"
            size="xlg"
            onClick={handleStartBattle}
            disabled={!selectedPokemonId}
          >
            Switch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { SwitchPokemonDialog };
