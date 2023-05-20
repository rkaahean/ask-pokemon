import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { Configuration, OpenAIApi } from "openai"
import { Pokemon } from "pokenode-ts"

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getPokemonQuery(query: string){
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
  `
  try{
    const config = new Configuration({
      apiKey: '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',
    })
    const openai = new OpenAIApi(config);
    // ask chat gpt about query
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": queryTemplate
        }
      ]
    })
    // get the answer back
    const answer = completion.data.choices[0].message?.content as string;
    // given the answer, convert it into JSON
    const answerJSON = JSON.parse(answer)
    // get the id's from the answer. get only top 2 for now
    const pokemonId =  answerJSON.data.id.slice(0, 2)
    return pokemonId
  } catch(err){
    console.log(err)
  }
}

export async function getPokemonData(id: string){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data: Pokemon = await res.json()
  return data.name;
}