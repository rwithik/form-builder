import React from "react";

const getQuestionText = (question, optional) => (
  <>
    {question} {!optional && <span className="star">* </span>}
  </>
);

function DropdownQuestion(props) {
  const { question, questionID, optional, hint, options } = props.question;
  return (
    <div className="question">
      <label htmlFor={questionID}>{getQuestionText(question, optional)}</label>
      <select data-type="radio" name={questionID} required={!optional}>
        <option style={{ color: "gray" }} value="">
          {hint}
        </option>
        {options.map((option) => (
          <option data-answerid={option.answerID} value={option.answerID + "✕" + option.answerText}>
            {option.answerText}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextQuestion(props) {
  const { question, questionID, optional, hint, options } = props.question;
  return (
    <div className="question">
      <label htmlFor={questionID}>{getQuestionText(question, optional)}</label>
      <input
        data-type="input"
        data-answerid={options[0].answerID}
        name={questionID}
        placeholder={hint}
        required={!optional}
      />
    </div>
  );
}

export default function Question({ question }) {
  if (question.type === "radio") return <DropdownQuestion question={question} />;
  else if (question.type === "input") return <TextQuestion question={question} />;
}
