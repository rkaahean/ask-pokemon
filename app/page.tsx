"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPokemonData, getPokemonQuery } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePokemonQuery = async () => {
    // set initial state
    setLoading(true);
    setQueryResults([]);
    const results = (await getPokemonQuery(query)) as string[];
    console.log(results);
    // make a promise for each pokemon. Then do promise.all
    const promises = results.map((pokemon) => getPokemonData(pokemon));
    // wait for all promises to resolve
    const apiData = await Promise.all(promises);
    // set results state
    setLoading(false);
    setQueryResults(apiData);
  };

  const handleQueryCancel = () => {
    setQuery("");
    setQueryResults([]);
    setLoading(false);
  }
  // when loading is true or when loading is false and query results is empty
  // TODO: ignore animation while the query is still being typed
  const isSearchBarMinimized = loading || queryResults.length != 0 || query.length != 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.div
        className="w-1/2 flex flex-row space-x-5"
        animate={{
          y: isSearchBarMinimized ? -300: 0,
          scale: isSearchBarMinimized ? 0.9: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          mass: 0.8
        }}
      >
        <Button className="mr-2 bg-red-700 hover:bg-red-500" onClick={handleQueryCancel}>Clear</Button>
        <Input
          type="text"
          placeholder="Ask questions about pokemon..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Button
          className="ml-2"
          onClick={handlePokemonQuery}
          disabled={query.length === 0}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Search
        </Button>
      </motion.div>
      <div>{queryResults}</div>
    </main>
  );
}
