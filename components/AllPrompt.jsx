"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const AllPrompt = () => {
  const { data: session, status } = useSession();
  const [prompts, setPrompts] = useState([]);

  const showPrompts = async () => {
    if (!session || status === "loading") {
      return;
    }

    try {
      const userId = session.user?.id;
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      const response = await fetch(`/api/user/${userId}/posts`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setPrompts(data);
        console.log(data);
      } else {
        console.error("Failed to fetch prompts.");
      }
    } catch (error) {
      console.error("An error occurred while fetching prompts:", error);
    }
  };

  useEffect(() => {
    showPrompts();
  }, [session, status]);

  return (
    <div className="flex flex-col justify-center items-center">
      {prompts && prompts.length ? (
        prompts.map((prompt, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center p-2 bg-slate-200/10"
          >
            {prompt.prompt}
          </div>
        ))
      ) : (
        <div className="flex flex-row justify-center items-center p-1">
          No prompts found
        </div>
      )}
    </div>
  );
};

export default AllPrompt;
