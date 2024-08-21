"use client";
import React, { useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [foundPrompts, setFoundPrompts] = useState([]);
  const [searchPrompt, setSearchPrompt] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/prompt/search-prompt/${searchPrompt}`, {
        method: "GET",
      });
      if (response.ok) {
        const foundPrompts = await response.json();
        setFoundPrompts(foundPrompts);
      } else {
        console.log('Response error:', response.statusText);
      }
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };
  
  return (
    <section className="w-full flex flex-col justify-center items-center p-2 bg-slate-200/10 ">
      <form onSubmit={handleSearch} className="gap-2 border-0 rounded-md flex flex-col justify-center items-center bg-slate-200/20">
        <input
          type="text"
          className="px-2 py-1 text-black-200/50 font-semibold font-sans shadow-md"
          placeholder="Search a Prompt here"
          value={searchPrompt}
          onChange={(e) => {
            setSearchPrompt(e.target.value);
          }}
        />
        <div className="flex flex-col justify-center items-center">
          <button type="submit" className="bg-blue-500 text-shite font-sans font-semibold px-2 py-1 rounded-md">
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-3 row-auto gap-5">
        {
          foundPrompts.map((prompt, index) => (
            <PromptCard prompt={prompt} key={index}/>
          ))
        }
      </div>
    </section>
  );
};

export default Feed;
