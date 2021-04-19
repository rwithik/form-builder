import React, { useState } from "react";
import Question from "./Question";
import { questions } from "../assets/form.json";

export default function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = [];
    [...e.target.elements].slice(0, questions.length).forEach((e) => {
      const obj = { questionID: e.name };
      if (e.dataset.type === "radio") {
        const [answerID, answerText] = e.value.split("✕");
        obj.answerID = answerID;
        obj.answerText = answerText;
      } else if (e.dataset.type === "input") {
        obj.answerID = e.dataset.answerid;
        obj.answerText = e.value;
      }
      values.push(obj);
    });

    setOutput(JSON.stringify({ result: values }, null, 2));
  };

  const [output, setOutput] = useState("");
  return (
    <div className="container">
      <h2>Form Title</h2>
      <span>
        <span className="star">*</span> means required
      </span>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {questions.map((question) => (
          <Question question={question} />
        ))}
        <input type="submit" value="Submit" />
      </form>
      {output.length > 0 && (
        <div>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
