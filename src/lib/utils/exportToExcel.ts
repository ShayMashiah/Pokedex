import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Pokemon } from "@/lib/types";

export const exportToExcel = (data: Pokemon[]) => {
  if (!data.length) return;

  const worksheetData = data.map((pokemon) => ({
    ID: pokemon.id,
    Name: pokemon.name?.english ?? '',
    Type: Array.isArray(pokemon.type) ? pokemon.type.join(", ") : pokemon.type ?? '',

    HP: pokemon.base?.HP ?? '',
    Attack: pokemon.base?.Attack ?? '',
    Defense: pokemon.base?.Defense ?? '',
    SpAttack: pokemon.base?.["Sp. Attack"] ?? '',
    SpDefense: pokemon.base?.["Sp. Defense"] ?? '',
    Speed: pokemon.base?.Speed ?? '',

    Species: pokemon.species ?? '',
    Description: pokemon.description ?? '',

    Height: pokemon.profile?.height ?? '',
    Weight: pokemon.profile?.weight ?? '',

    Ability: Array.isArray(pokemon.profile?.ability)
        ? pokemon.profile.ability
      .map((a) => {
        if (Array.isArray(a)) {
          return a
            .filter(item => typeof item === "string")
            .map(str => str.replace(/,?\s*(true|false)?\s*$/i, '').trim())
            .filter(str => str.length > 0)
            .join(", ");
        }
        return null; 
      })
      .filter((str): str is string => !!str && str.length > 0) 
      .join(" | ")
    : '',

  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pokemons");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "pokemon_list.xlsx");
};
