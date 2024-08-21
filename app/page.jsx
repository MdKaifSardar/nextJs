import AllPrompt from "@components/AllPrompt";
import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full justify-center items-center flex flex-col">
      <h1 className="head_text text-center">
        Disocer & share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio iste explicabo sequi nemo doloremque vitae ipsum velit modi vero ducimus facere, praesentium accusamus, repudiandae dolorem fuga unde error, reiciendis omnis mollitia perspiciatis porro adipisci.
      </p>
      <Feed/>
    </section>
  );
};

export default Home;
