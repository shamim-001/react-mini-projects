import { useState } from "react";

const App = () => {
  const [text, setText] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const submitBtn = document.getElementById("submitbtn") as HTMLButtonElement;

    if (value) {
      setDisabled(false);
      submitBtn.classList.remove("cursor-pointer", "opacity-100", "opacity-40");
      submitBtn.classList.add("cursor-pointer", "opacity-100");
    } else {
      setDisabled(true);
      submitBtn.classList.remove("cursor-pointer", "opacity-100", "opacity-40");
      submitBtn.classList.add("opacity-40");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = e.currentTarget.elements[0].value.toLowerCase();
    const form = document.querySelector("form") as HTMLFormElement;
    const message = document.getElementById("message") as HTMLParagraphElement;
    const header = document.getElementById("header") as HTMLHeadingElement;

    if (value === "istanbul") {
      form.classList.add("hidden");
      header.classList.add("hidden");
      message.classList.remove("hidden", "text-orange-700");
      message.classList.add("block", "text-4xl", "text-green-700");
      setText(`That's right!`);
    } else {
      message.classList.remove("hidden", "text-green-700");
      message.classList.add("block", "text-orange-700");
      setText("Good guess but a wrong answer. Try again!");
    }
  }

  return (
    <div className="bg-gray-400 max-w-s min-h-screen flex flex-col justify-center items-center">
      <h1 id="header" className="text-4xl mb-3">
        City quiz
      </h1>
      <form action="#" onChange={handleChange} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="input">What city is located on two continents?</label>
          <input
            type="text"
            id="input"
            name="inputtext"
            className="outline-0 border border-solid rounded"
            autoComplete="off"
          />
        </div>

        <button
          className="outline-0 my-2 border border-solid border-gray-500 p-2 rounded opacity-40"
          id="submitbtn"
          disabled={disabled}
          type="submit"
        >
          Submit
        </button>
      </form>
      <p id="message" className="hidden">
        {text}
      </p>
    </div>
  );
};

export default App;
