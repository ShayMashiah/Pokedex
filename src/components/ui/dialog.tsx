import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

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
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  variant?: "default" | "poke-info" | "my-pokemons";
  pokemon?: {
    id: number;
    name: string;
    image: string;
    description: string;
    height: string;
    weight: string;
    category: string;
    abilities: string;
  };
  pokemons?: {
    id: number;
    name: string;
    image: string;
  }[];
  onSelectPokemon?: (pokemonId: number) => void;
  onStartBattle?: () => void;
}) {
  const perRow = 3;
  if(!pokemons)
    return;
  
  const fullRows = Math.floor(pokemons.length / perRow);
  const lastRowStart = fullRows * perRow;
  const fullItems = pokemons.slice(0, lastRowStart);
  const remainingItems = pokemons.slice(lastRowStart);
  

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-neutrals-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          variant === "poke-info" && "sm:max-w-md p-6",
          className
        )}
        {...props}
      >
        {/* {variant === "poke-info" && pokemon ? (
          <div className="space-y-4">
            <div className="text-end text-muted-foreground text-sm">
              #{String(pokemon.id).padStart(4, "0")}
            </div>
            <DialogHeader className="items-center text-center">
              <DialogTitle className="text-2xl font-semibold">
                {pokemon.name}
              </DialogTitle>
            </DialogHeader>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="mx-auto w-32 h-32"
            />
            <div className="bg-muted text-muted-foreground p-4 rounded-md text-sm text-center">
              {pokemon.description}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col items-center">
                <span className="font-semibold">Height</span>
                <span>{pokemon.height}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">Weight</span>
                <span>{pokemon.weight}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">Category</span>
                <span>{pokemon.category}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">Abilities</span>
                <span>{pokemon.abilities}</span>
              </div>
            </div>
          </div> */}
        {/* ) */}
         {/* : variant === "my-pokemons" && pokemons ? ( */}
          <div className="space-y-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-headingLgMedium text-neutrals-500">
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
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-102.35 h-102.35 rounded-full"
                  />
                </button>
              ))}
            </div>

            {remainingItems.length > 0 && (
              <div className="flex justify-center gap-76 mt-4">
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

            <DialogFooter className="flex justify-center border-t border-neutrals-light pt-16">
              <Button variant="primary" size="xlg">Start battle</Button>
            </DialogFooter>
          </div>
        {/* ) : (
          children
        ) */}

        <DialogPrimitive.Close className="absolute top-4 right-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
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
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row",
        className
      )}
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
      className={cn("text-lg leading-none font-semibold", className)}
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
