"use client";

import classNames from "classnames";
import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { getCardColor } from "@/lib/utils";

export const PokemonCard = ({ data }: { data: Pokemon }) => {
  // get image url
  const imageUrl = data.sprites.front_default as string;
  // get types
  const types = data.types.map((type) => type.type.name);

  // card color
  const bgColor = getCardColor(types[0]);
 
  console.log('BG', bgColor);
  return (
    <Card
      className={classNames(
        "hover:shadow-lg",
        "flex h-80 w-80 flex-row items-center justify-center",
        "border-1 border-indigo-900",
        {
            "bg-red-500": types[0] === "fire",
            "bg-blue-500": types[0] === "water",
            "bg-green-500": types[0] === "grass",
            "bg-yellow-500": types[0] === "electric",
            "bg-purple-500": types[0] === "poison",
            "bg-pink-500": types[0] === "fairy",
        },
      )}
    >
        <div className="relative w-44 h-44">
        <Image src={imageUrl} alt={data.name} fill priority />

        </div>
      <CardContent>
        <div className="flex w-full flex-col items-start justify-between">
          <div className="text-xl font-medium text-stone-200">{data.name}</div>
          <Separator className="my-4" />
          <div>
            <div className={classNames("text-base text-stone-300")}>
              {types[0]}
            </div>
            <div
              className={classNames(
                "text-xs italic tracking-wider text-muted-foreground"
              )}
            >
              Type
            </div>
          </div>
          <div>
            <div className={classNames("text-base text-stone-300")}>
              {data.abilities[0].ability.name}
            </div>
            <div
              className={classNames(
                "text-xs italic tracking-wider text-muted-foreground"
              )}
            >
              Ability
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex w-full flex-col items-start justify-between">
          <div className={classNames("text-base text-stone-300")}>
            {data.moves.slice(0, 2).map((move, index) => {
              return <div key={index}>{move.move.name}</div>;
            })}
          </div>
          <div
            className={classNames(
              "text-xs italic tracking-wider text-muted-foreground"
            )}
          >
            Moves
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
