import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../Button/button";
import { Variant, type PokemonModal } from "../../../lib/types";
import type { CustomDialogContentProps } from "../../../lib/types";
import pokemonData from "../../../data/pokemon_.json";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  variant,
  pokemon,
  pokemons,
  onSelectPokemon,
  onStartBattle,
  ...props
}: CustomDialogContentProps) {
  const perRow = 3;
  let fullItems: typeof pokemons = [];
  let remainingItems: typeof pokemons = [];

  if (variant === Variant.MyPokemons && pokemons) {
    const fullRows = Math.floor(pokemons.length / perRow);
    const lastRowStart = fullRows * perRow;
    fullItems = pokemons.slice(0, lastRowStart);
    remainingItems = pokemons.slice(lastRowStart);
  }

  const selectedPokemon = React.useMemo(() => {
    if (!pokemon?.id) return null;

    return pokemonData.find((p) => p.id === pokemon.id) ?? null;
  }, [pokemon]);

  const selectedPokemonModal: PokemonModal | null = React.useMemo(() => {
    if (!selectedPokemon) return null;

    return {
      id: selectedPokemon.id,
      name: selectedPokemon.name.english,
      image: selectedPokemon.image?.thumbnail ?? "",
      description: selectedPokemon.description,
      height: selectedPokemon.profile?.height ?? "Unknown",
      weight: selectedPokemon.profile?.weight ?? "Unknown",
      category: selectedPokemon.type ?? "Unknown",
      abilities:
        selectedPokemon.profile?.ability
          ?.map((a: string[]) => a[0].split(",")[0].trim())
          .join(", ") ?? "Unknown",
    };
  }, [selectedPokemon]);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-neutrals-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          variant === Variant.PokeInfo && "sm:max-w-md p-6",
          className
        )}
        {...props}
      >
        {variant === Variant.PokeInfo && selectedPokemonModal ? (
          <>
            <DialogHeader className="items-start border-neutrals-light font-mulish">
              <div className="text-start text-muted-foreground text-subheadingRegular text-neutral-200 w-48 h-26">
                #{String(selectedPokemonModal.id).padStart(4, "0")}
              </div>
              <DialogTitle className="text-pokemonModalTitle h-26 text-neutrals-500 font-mulish">
                {selectedPokemonModal.name}
              </DialogTitle>
            </DialogHeader>
            <div className="w-435 py-16 px-16">
              <img
                src={selectedPokemonModal.image}
                alt={selectedPokemonModal.name}
                className="mx-auto w-158 h-158 pt-10 pb-10"
              />
            </div>
            <div className="px-16 pb-16">
              <div className="bg-neutrals-900  space-y-4 max-w-440 font-mulish text-sm text-neutrals-500">
                <p className="p-24">{selectedPokemonModal.description}</p>
                <hr className="border-t border-neutrals-200" />
                <div className="grid grid-cols-4 gap-24 p-24">
                  <div className="flex flex-col  gap-6">
                    <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                      Height
                    </span>
                    <span className="text-pokemonModalStats font-mulish text-neutrals-500 ">
                      {selectedPokemonModal.height}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                      Weight
                    </span>
                    <span className="text-pokemonModalStats text-neutrals-500 font-mulish">
                      {selectedPokemonModal.weight}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                      Category
                    </span>
                    <span className="text-pokemonModalStats text-neutrals-500 font-mulish">
                      {selectedPokemonModal.category}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                      Abilities
                    </span>
                    <span className="text-pokemonModalStats  text-neutrals-500 font-mulish">
                      {selectedPokemonModal.abilities}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : variant === Variant.MyPokemons && pokemons ? (
          <>
            <DialogHeader className="items-start border-neutrals-light font-mulish">
              <DialogTitle className="font-mulish !text-headingLgMedium text-neutrals-500 py-24 px-10">
                Choose the Pokemon to battle with
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-2 justify-items-center">
              {fullItems.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPokemon?.(p.id)}
                  className="rounded-full border-2 mt-16 border-transparent hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

            {remainingItems.length > 0 && (
              <div className="flex justify-center gap-76 pt-10">
                {remainingItems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPokemon?.(p.id)}
                    className="rounded-full border-2 border-transparent hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

            <div className="border-t border-neutrals-light mt-24">
              <DialogFooter className="flex justify-center py-16 px-16">
                <Button variant="primary" size="xlg" onClick={onStartBattle}>
                  Start battle
                </Button>
              </DialogFooter>
            </div>
          </>
        ) : (
          children
        )}

        <DialogPrimitive.Close className="absolute top-12 right-24 opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col py-6 px-18 text-center sm:text-left",
        className
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(" leading-none", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
