"use client";

import React, { useState } from "react";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });

      const newPrompt  = await response.json();
      setSubmitting(false);

      console.log(newPrompt);
      if (response.ok) {
        router.push("/");
        console.log(success);
      } 
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      createPrompt={createPrompt}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default Page;
