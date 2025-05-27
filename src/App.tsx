import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function App() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Open My Pokémons</button>
      </DialogTrigger>
      <DialogContent
        variant="my-pokemons"
        pokemons={[
          {
            id: 1,
            name: "Bulbasaur",
            image: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg",
          },
          {
            id: 2,
            name: "Ivysaur",
            image: "https://img.pokemondb.net/artwork/large/ivysaur.jpg",
          },
          {
            id: 3,
            name: "Caterpie",
            image: "https://img.pokemondb.net/artwork/large/caterpie.jpg",
          },
          {
            id: 4,
            name: "Charmander",
            image: "https://img.pokemondb.net/artwork/large/charmander.jpg",
          },
          {
            id: 5,
            name: "Clefairy",
            image: "https://img.pokemondb.net/artwork/large/clefairy.jpg",
          },
        ]}
        onSelectPokemon={(id) => console.log("Selected:", id)}
        onStartBattle={() => console.log("Battle started!")}
      />
    </Dialog>
  );
}

export default App;
