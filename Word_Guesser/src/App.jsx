import { useEffect, useState, useRef } from "react";
import "./index.css";
import data from "./data/words.json";

const App = () => {
  // Guess from the user, store as array since we'll give 6 guesses
  const [guess, setGuess] = useState([]);
  // Track the number of guesses from the user
  const [numGuessed, setNumGuessed] = useState(0);
  // Word for the user to guess
  const [word, setWord] = useState("");
  const hasRun = useRef(false);
  let userInput = document.querySelector("#user-guess");

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

  const handleGuess = () => {
    console.log(`Chosen word in the state: ${word}`);
    console.log(`Number of guesses taken by the user: ${numGuessed}`);

    setNumGuessed(numGuessed + 1);
  };

  return (
    <>
      <div className="container-fluid mt-4 text-light app-container">
        <div className="card shadow-sm bg-dark">
          <div className="card-body text-light">
            <header className="text-center mb-4">
              <h1>Word Guesser</h1>
            </header>

            <table className="table table-dark table-bordered text-center">
              <tbody>
                <tr>
                  <td className="bg-success">T</td>
                  <td className="bg-warning">A</td>
                  <td>B</td>
                  <td>L</td>
                  <td>E</td>
                </tr>
                <tr>
                  <td>T</td>
                  <td>R</td>
                  <td>U</td>
                  <td>T</td>
                  <td>H</td>
                </tr>
                <tr>
                  <td>T</td>
                  <td>H</td>
                  <td>A</td>
                  <td>N</td>
                  <td>K</td>
                </tr>
                <tr>
                  <td>D</td>
                  <td>R</td>
                  <td>A</td>
                  <td>N</td>
                  <td>K</td>
                </tr>
                <tr>
                  <td>P</td>
                  <td>R</td>
                  <td>A</td>
                  <td>N</td>
                  <td>K</td>
                </tr>
                <tr>
                  <td>C</td>
                  <td>R</td>
                  <td>A</td>
                  <td>N</td>
                  <td>K</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex bg-dark mt-3">
              <input
                className="form-control me-2"
                type="text"
                id="user-guess"
                required
                minLength={5}
                maxLength={5}
                placeholder="Enter your guess"
              />
              <button
                className="btn btn-success btn-small text-light btn-guess"
                onClick={handleGuess}
              >
                Guess
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
