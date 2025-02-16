//import GoogleGenerativeAI from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function Page() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  //const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-002" });

  const P1 = "Japan's population";
  const P2 = "France's population";

  const TrendPrompt = `Tell me if ${P1} is more looked than ${P2} on Google. The answer should be the word "true" or the word "false" only`;
  const biggerPrompt = `Tell me if ${P1} is bigger than ${P2}, in 2024. The answer should just be a string like "the population of XX is bigger than the population of YY"`;
  //const prompt = "generate an image in the style of an impressionist painting: a robot on the back of a giant sea turtle";
  const result = await model.generateContent(biggerPrompt);
  const textResult = await result.response.text();

  return (
    <>
      {/* <p>{textResult}</p>
      <p>{textResult.includes("true") ? `${P1} > ${P2}` : `${P1} < ${P2}`}</p> */}
      <p>{`${textResult}`}</p>
    </>
  );
}
