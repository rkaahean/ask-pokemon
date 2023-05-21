import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Configuration, OpenAIApi } from "openai";
import { Pokemon, Types } from "pokenode-ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPokemonData(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data: Pokemon = await res.json();

  return data;
}

export const getCardColor = (type: string) => {
  if (type === "fire") {
    return "bg-red-500"
  } else if (type === "water") {
    return "bg-blue-500"
  } else if (type === "grass") {
    return "bg-green-500"
  } else if (type === "electric") {
    return "bg-yellow-500"
  } else if (type === "ice") {
    return "bg-blue-300"
  } else {
    return "bg-gray-500"
  }
}