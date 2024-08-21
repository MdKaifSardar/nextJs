import Prompt from "@models/promptModel";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const { keyWord } = params;
  try {
    await connectToDB();
    const foundPrompt = await Prompt.find({
      $or: [
        { prompt: { $regex: keyWord, $options: "i" } },
        { tag: { $regex: keyWord, $options: "i" } },
      ],
    });
    if (foundPrompt.length == 0) {
      return new Response("No Prompt Found", { status: 404 });
    }
    return new Response(JSON.stringify(foundPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Error while getting the prompts", { status: 500 });
  }
};
