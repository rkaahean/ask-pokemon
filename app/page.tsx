"use client";

import { PokemonCard } from "@/components/PokemonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPokemonData } from "@/lib/utils";
import classNames from "classnames";
import { m, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Pokemon } from "pokenode-ts";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePokemonQuery = async () => {
    // set initial state
    setLoading(true);
    setQueryResults([]);
    const results = await fetch("/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    }).then((res) => res.json());
    console.log("RESULTS",results);
    // make a promise for each pokemon. Then do promise.all
    const promises = results.map((pokemon:string) => getPokemonData(pokemon));
    // wait for all promises to resolve
    const apiData = await Promise.all(promises);
    // set results state
    setLoading(false);
    setQueryResults(apiData);
    console.log(apiData);
  };

  const handleQueryCancel = () => {
    setQuery("");
    setQueryResults([]);
    setLoading(false);
  };
  // when loading is true or when loading is false and query results is empty
  // TODO: ignore animation while the query is still being typed
  const isSearchBarMinimized =
    loading || queryResults.length != 0 || query.length != 0;

  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-2 sm:p-24 bg-stone-900 space-y-20">
      <motion.div
        className="w-full md:w-1/2 flex flex-row space-x-2 sm:space-x-5"
        animate={{
          y: isSearchBarMinimized ? 0 : 300,
          scale: isSearchBarMinimized ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          mass: 0.5,
        }}
      >
        <Button
          className="bg-red-700 hover:bg-red-500 text-xs sm:text-base"
          onClick={handleQueryCancel}
        >
          Clear
        </Button>
        <Input
          type="text"
          placeholder="Ask questions about pokemon..."
          onChange={(e) => setQuery(e.target.value)}
          className={classNames(
            "text-stone-300 border-0 ring-0",
            "bg-stone-800",
            "text-xs sm:text-base",
            "focus-visible:ring-1 focus-visible:ring-stone-600"
          )}
          value={query}
        />
        <Button
          className="ml-2 bg-blue-700 hover:bg-blue-500 text-xs sm:text-base"
          onClick={handlePokemonQuery}
          disabled={query.length === 0}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Search
        </Button>
      </motion.div>
      <div className="flex flex-col sm:flex-row w-full sm:w-2/3 justify-center space-x-10">
        {queryResults.map((pokemon) => {
          return <PokemonCard data={pokemon} key={pokemon.id}/>;
        })}
      </div>
    </main>
  );
}
