"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

export const PokemonCard = ({ data }: { data: Pokemon }) => {
  // get image url
  const imageUrl = data.sprites.front_default as string;
  // get types
  const types = data.types.map((type) => type.type.name);
  return (
    <motion.div
      animate={{
        x: 0,
      }}
      initial={{
        x: -50,
      }}
      whileHover={{
        scale: 1.1,
      }}
    >
      <Card
        className={classNames(
          "hover:shadow-lg",
          "flex flex-row items-center justify-center",
          "border-1 border-indigo-900",
          "h-60 w-60 sm:h-80 sm:w-80",
          {
            "bg-red-500": types[0] === "fire",
            "bg-blue-500": types[0] === "water",
            "bg-green-500": types[0] === "grass",
            "bg-yellow-500": types[0] === "electric",
            "bg-purple-500": types[0] === "poison",
            "bg-pink-500": types[0] === "fairy",
            "bg-stone-500": types[0] === "rock",
            "bg-orange-500": types[0] === "ground",
            "bg-teal-500": types[0] === "bug",
            "bg-violet-500": types[0] === "psychic",
            "bg-orange-800": types[0] === "dragon",
            "bg-teal-200": types[0] === "normal",
            "bg-blue-300": types[0] === "ice",
          }
        )}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-44 h-44">
            <Image src={imageUrl} alt={data.name} fill priority />
          </div>
          <div className="italic text-xs">{data.weight} lb</div>
        </div>

        <CardContent>
          <div className="flex w-full flex-col items-start justify-between">
            <div className="text-xl font-medium text-stone-900">
              {data.name}
            </div>
            <Separator className="my-4" />
            <div>
              <div className={classNames("text-base text-stone-800")}>
                {types[0]}
              </div>
              <div
                className={classNames(
                  "text-xs italic tracking-wider text-stone-700"
                )}
              >
                Type
              </div>
            </div>
            <div>
              <div className={classNames("text-base text-stone-800")}>
                {data.abilities[0].ability.name}
              </div>
              <div
                className={classNames(
                  "text-xs italic tracking-wider text-stone-700"
                )}
              >
                Ability
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex w-full flex-col items-start justify-between">
            <div className={classNames("text-base text-stone-800")}>
              {data.moves.slice(0, 2).map((move, index) => {
                return <div key={index}>{move.move.name}</div>;
              })}
            </div>
            <div
              className={classNames(
                "text-xs italic tracking-wider text-stone-700"
              )}
            >
              Moves
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
