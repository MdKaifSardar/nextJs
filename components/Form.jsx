import React from "react";

const Form = ({
  type,
  createPrompt,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="flex flex-col w-1/2">
      <div className="w-full font-3xl font-semibold head-text text-left">
        <span className="blue_gradient">{type} Post</span>
      </div>
      <p className="text-left desc max-w-md">
        {type} and share ai prompts with any ai powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="p-2 gap-5 w-full flex flex-col justify-center items-center "
      >
        <div className="gap-1 w-full flex flex-col justify-center items-start">
          <label htmlFor="">Enter prompt</label>
          <textarea
            id="prompt"
            onChange={(e) => {
              setPost({
                ...post,
                prompt: e.target.value,
              });
            }}
            value={post.prompt}
            type="text"
            placeholder="Enter Prompt"
            required
            className="w-full p-1 border-0 "
          />
        </div>

        <div className="gap-1 w-full flex flex-col justify-center items-start">
          <label htmlFor="tag">Enter Tag</label>
          <input
            type="text"
            className="w-full p-1 border-0"
            id="tag"
            value={post.tag}
            onChange={(e) => {
              setPost({
                ...post,
                tag: e.target.value,
              });
            }}
            placeholder="Enter tag"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 rounded-full hover:bg-blue-500/60 px-4 py-2 border-[2px] border-blue text-white font-thin font-sans"
          >
            {submitting ? `${type} ...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
