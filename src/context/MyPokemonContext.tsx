import { createContext, useContext, useState, type ReactNode } from "react";

type MyPokemonContextType = {
  myPokemons: number[];
  setMyPokemons: (ids: number[]) => void;
  addPokemon: (id: number) => void;
  removePokemon: (id: number) => void;
};

const MyPokemonContext = createContext<MyPokemonContextType | undefined>(undefined);

export const MyPokemonProvider = ({ children }: { children: ReactNode }) => {
  const [myPokemons, setMyPokemons] = useState<number[]>([1, 4, 6, 25, 101, 133]);

  const addPokemon = (id: number) => {
    setMyPokemons((prev) => {
      if (prev.includes(id)) {
        return prev;
      }
      const newArr = [...prev, id];
      return newArr;
    });
  };

  const removePokemon = (id: number) => {
    setMyPokemons((prev) => prev.filter((pid) => pid !== id));
  };

  return (
    <MyPokemonContext.Provider
      value={{ myPokemons, setMyPokemons, addPokemon, removePokemon }}
    >
      {children}
    </MyPokemonContext.Provider>
  );
};

export const useMyPokemon = () => {
  const context = useContext(MyPokemonContext);
  if (!context) {
    throw new Error("useMyPokemon must be used within MyPokemonProvider");
  }
  return context;
};
