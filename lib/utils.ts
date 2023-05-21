import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Configuration, OpenAIApi } from "openai";
import { Pokemon, Types } from "pokenode-ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPokemonQuery(query: string) {
  const queryTemplate = `
  Answer the question below in about pokemon.
  Return the answers in the following format:
  "{
    data":{
      "id": [1, 2, 3]
    }
  }"
  That is, return a list of ID's.
  Where id is the pokemon id. Do not return any other information.
  ${query}
  `;
  try {
    const config = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(config);
    // ask chat gpt about query
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: queryTemplate,
        },
      ],
    });
    // get the answer back
    const answer = completion.data.choices[0].message?.content as string;
    // given the answer, convert it into JSON
    const answerJSON = JSON.parse(answer);
    // get the id's from the answer. get only top 2 for now
    const pokemonId = answerJSON.data.id.slice(0, 3);
    return pokemonId;
  } catch (err) {
    console.log(err);
  }
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