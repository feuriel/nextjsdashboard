//import GoogleGenerativeAI from "@google/generative-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
//import { useState } from "react";

export default async function Page() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `The expected answer is a string format like this : {"question": "the question goes here" , "unit" : "the unit that makes sense", "fun_fact":"something funny that we learn here", "category" : "superficy", "items":[ {"name": "the name of the item",  "value": 40}, {"name": "the name of the item", "value": 80}] } .
    The category that we compare should be a integer or double unit so that we can easily compare them. 
There should be 2 elements in the array of items every time, only 2.
The question should always be turned towards the bigger, i.e. the question should NOT say "which country has the smallest superficy ?".
Every category you give should make me learn a fun fact, the fun fact should be directly related with the question.
There should not be more than 2 questions in the same domain in a one chat session.
The answer should be a plain text response without code formatting that I can later parse to a JSON directly`,
  });
  const generationConfig = {
    temperature: 1.9,
    topP: 0.15,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const prompt = "give me another fun fact on completely different domain";
  // const [result, setResult] = useState("");
  // const [wholeJSON, setwWoleJSON] = useState("");

  const _result = await model.generateContent(prompt);
  //setResult(_result as any);
  const textResult = await _result.response.text();
  console.log(textResult);
  const jsonResult = JSON.parse(textResult);
  const stringified = textResult.toString();

  let item0 = jsonResult.items[0];
  let item1 = jsonResult.items[1];

  let winner = item0.value > item1.value ? item0.name : item1.name;

  const generateQuestion = async () => {
    // const _result = await model.generateContent(prompt);
    // const _textResult = await _result.response.text();
    // setwWoleJSON(_textResult as any);
  };
  return (
    <>
      {/* <p>{textResult}</p>
      <p>{textResult.includes("true") ? `${P1} > ${P2}` : `${P1} < ${P2}`}</p> */}
      {/* <p>{`${wholeJSON}`}</p> */}
      <p>{`${jsonResult.question}`}</p>
      <br />
      <br />
      <p>{`${item0.name} OR ${item1.name}`}</p>
      <br />
      <br />
      <br />
      <p>{`${winner}`}</p>
      <p>{`${jsonResult.fun_fact}`}</p>
      {/* <button onClick={generateQuestion}>generate question</button> */}
    </>
  );
}
