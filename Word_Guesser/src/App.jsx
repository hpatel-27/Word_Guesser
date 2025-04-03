import { useEffect, useState, useRef } from "react";
import "./App.css";
import data from "./data/words.json";

const App = () => {
  // Guess from the user
  const [guess, setGuess] = useState("");
  // Word for the user to guess
  const [word, setWord] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      // run once
      // pick a word on load in
      chooseWord();
      hasRun.current = true;
    }
  });

  const chooseWord = () => {
    // helper function to pick a word from the words data
    const wordIndex = Math.floor(Math.random() * 488);
    const chosenWord = data.words[wordIndex].toUpperCase();
    console.log(`chosen word: ${chosenWord}`);
    setWord(chosenWord);
  };

  const getWord = () => {
    console.log(`Chosen word in the state: ${word}`);
  };

  return (
    <>
      <div className="container mt-4">
        <header>
          <h1>Word Guesser</h1>
        </header>
        <button onClick={getWord}></button>
      </div>
    </>
  );
};

export default App;
