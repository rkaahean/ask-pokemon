import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {
  const { query } = await request.json();
  const queryTemplate = `
    Answer the question below in about pokemon.
    Return the answers in the following format:re
    "{
      data":{
        "id": [1, 2, 3]
      }
    }"
    That is, return a list of ID's.
    Where id is the pokemon id. DO NOT RETURN ANYTHING ELSE.
    YOUR OUTPUT SHOULD BE JSON ONLY.
    ${query}
    `;
  try {
    const config = new Configuration({
      apiKey: process.env.OPENAI_KEY as string,
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
    console.log("Answer", answer);
    // given the answer, convert it into JSON
    const answerJSON = JSON.parse(answer);
    console.log("Answer JSON", answerJSON);

    // get the id's from the answer. get only top 2 for now
    const pokemonId = answerJSON.data.id.slice(0, 3);
    return NextResponse.json(pokemonId);
  } catch (err) {
    console.log(err);
  }
}
