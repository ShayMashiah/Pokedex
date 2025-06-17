import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../Button/button";
import { Variant } from "../../../lib/constants";
import type { CustomDialogContentProps } from "../../../lib/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMyPokemon } from "@/context/MyPokemonContext";
import allPokemons from "@/data/pokemon_.json";
import { mapMyPokemonsByIds } from "@/lib/utils/mapMyPokemons";

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
  disabledPokemonId,
  ...props
}: CustomDialogContentProps) {
  const { myPokemons: myPokemonIds } = useMyPokemon();

  const myPokemons = React.useMemo(
    () => mapMyPokemonsByIds(myPokemonIds),
    [myPokemonIds]
  );

  const navigate = useNavigate();
  const perRow = 3;
  let fullItems: typeof myPokemons = [];
  let remainingItems: typeof myPokemons = [];

  const [selectedPokemonForBattle, setselectedPokemonForBattle] = useState<
    number | null
  >(null);

  const handleStartBattle = () => {
    const selected = myPokemons?.find((p) => p.id === selectedPokemonForBattle);
    if (!selected) return;
    navigate("/prebattle", { state: { selectedPokemon: selected } });
  };

  const handleSwitchPokemon = () => {
    const selected = myPokemons?.find((p) => p.id === selectedPokemonForBattle);
    if (!selected || !props.onSwitchPokemon) return;
    props.onSwitchPokemon(selected);
  };

  const onSelectPokemon = (id: number) => {
    setselectedPokemonForBattle(id);
  };

  if (variant === Variant.MyPokemons && myPokemons) {
    const fullRows = Math.floor(myPokemons.length / perRow);
    const lastRowStart = fullRows * perRow;
    fullItems = myPokemons.slice(0, lastRowStart);
    remainingItems = myPokemons.slice(lastRowStart);
  } else if (variant === Variant.SwitchPokemon && myPokemons) {
    const fullRows = Math.floor(myPokemons.length / perRow);
    const lastRowStart = fullRows * perRow;
    fullItems = myPokemons.slice(0, lastRowStart);
    remainingItems = myPokemons.slice(lastRowStart);
  }

  const selectedPokemonModal = React.useMemo(() => {
    if (!pokemon?.id) return null;

    return (
      allPokemons
        .map((p) => ({
          id: p.id,
          name: p.name?.english ?? "Unknown",
          image: p.image?.thumbnail ?? "",
          hires: p.image?.hires,
          speed: p.base?.Speed,
          hp: p.base?.HP,
          attack: p.base?.Attack,
          defense: p.base?.Defense,
          description: p.description ?? "No description available.",
          height: p.profile?.height ?? "Unknown",
          weight: p.profile?.weight ?? "Unknown",
          category: p.type?.join(", ") ?? "Unknown",
          abilities:
            p.profile?.ability
              ?.map((a: string[]) => a[0].split(",")[0].trim())
              .join(", ") ?? "Unknown",
        }))
        .find((m) => m.id === pokemon.id) ?? null
    );
  }, [pokemon]);

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
                {selectedPokemonModal.name ?? "Unknown"}
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
                <p className="p-24 text-textBaseRegular text-neutrals-500">{selectedPokemonModal.description}</p>
                <hr className="border-t border-neutrals-200" />
                <div className="grid grid-cols-4 gap-24 p-24">
                  <div className="flex flex-col  gap-6">
                    <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                      Height
                    </span>
                    <span className="text-textBaseRegular font-mulish text-neutrals-500 ">
                      {selectedPokemonModal.height}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                      Weight
                    </span>
                    <span className="text-textBaseRegular text-neutrals-500 font-mulish">
                      {selectedPokemonModal.weight}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-pokemonModalFields text-neutrals-400 w-36 h-18 font-mulish">
                      Category
                    </span>
                    <span className="text-textBaseRegular text-neutrals-500 font-mulish">
                      {selectedPokemonModal.category}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-pokemonModalFields text-neutrals-400 w-36  h-18 font-mulish">
                      Abilities
                    </span>
                    <span className="text-textBaseRegular  text-neutrals-500 font-mulish">
                      {selectedPokemonModal.abilities}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : variant === Variant.MyPokemons && myPokemons ? (
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
            )}

            <DialogFooter className="flex justify-center border-t border-neutrals-light py-16">
              <Button variant="primary" size="xlg" onClick={handleStartBattle}>
                Start battle
              </Button>
            </DialogFooter>
          </>
        ) : variant === Variant.SwitchPokemon && myPokemons ? (
          <>
            <DialogHeader className="items-start border-neutrals-light font-mulish">
              <DialogTitle className="font-mulish !text-headingLgMedium text-neutrals-500 py-24 px-10">
                Choose the Pokémon to battle with
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-2 justify-items-center">
              {fullItems.map((p) => {
                const isDisabled = p.id === disabledPokemonId;
                return (
                  <button
                    key={p.id}
                    onClick={() => !isDisabled && onSelectPokemon?.(p.id)}
                    disabled={isDisabled}
                    className={cn(
                      "rounded-full border-2 mt-16 transition",
                      isDisabled
                        ? "opacity-50 cursor-not-allowed border-transparent"
                        : "hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                );
              })}
            </div>

            {remainingItems.length > 0 && (
              <div className="flex justify-center gap-76 pt-10">
                {remainingItems.map((p) => {
                  const isDisabled = p.id === disabledPokemonId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => !isDisabled && onSelectPokemon?.(p.id)}
                      disabled={isDisabled}
                      className={cn(
                        "rounded-full border-2 transition",
                        isDisabled
                          ? "opacity-50 cursor-not-allowed border-transparent"
                          : "hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  );
                })}
              </div>
            )}

            <DialogFooter className="flex justify-center border-t border-neutrals-light py-16">
              <Button
                variant="primary"
                size="xlg"
                onClick={handleSwitchPokemon}
              >
                Start battle
              </Button>
            </DialogFooter>
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
