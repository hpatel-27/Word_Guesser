import { useEffect, useState, useRef } from "react";
import "./index.css";
import data from "./data/five_letter_words.json";
import Swal from "sweetalert2";

const App = () => {
  // Guess from the user, store as array since we'll give 6 guesses
  const [guessed, setGuessed] = useState([]);
  // Track the number of guesses from the user
  const [numGuessed, setNumGuessed] = useState(0);
  // Word for the user to guess
  const [word, setWord] = useState("");
  const hasRun = useRef(false);
  // load in the word data and convert to uppercase
  const wordList = data.words.map((wordData) => wordData.toUpperCase());
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
    const wordIndex = Math.floor(Math.random() * 490);
    const chosenWord = wordList[wordIndex].toUpperCase();
    console.log(`chosen word: ${chosenWord}`);
    setWord(chosenWord);
  };

  const handleGuess = () => {
    // Stop the user from guessing more if they have made 6 guesses
    if (guessed.length >= 6) {
      console.log(guessed);
      Swal.fire({
        title: "Out of Guesses",
        text: "You have already used all your guesses!",
        icon: "warning",
        confirmButtonText: "OK",
        theme: "dark",
      });
    } else {
      // Update the list of guesses and number of guesses
      let currGuess = userInput.value.trim().toUpperCase();
      if (wordList.includes(currGuess)) {
        // When the user picks a word that is allowed
        setGuessed((prevGuesses) => [...prevGuesses, currGuess]);
        userInput.value = "";
        const updateNumGuess = numGuessed + 1;
        setNumGuessed(updateNumGuess);

        // when a user guesses the right word
        checkGuess(currGuess, updateNumGuess);
      } else {
        // Word is not in the list, don't let them waste a guess
        Swal.fire({
          title: "Not A Word",
          text: "Not in our word list!",
          icon: "error",
          confirmButtonText: "OK",
          theme: "dark",
        });
      }
    }
  };

  const getLetterStatus = (guess) => {
    // Add to prevent any accidentally table element ordering
    if (guess === "") {
      return ["", "", "", "", ""];
    }
    const result = Array(5).fill("");
    const targetArr = word.split("");
    const guessArr = guess.split("");
    const used = Array(5).fill(false); // track matched letters in the target word

    // First pass – greens
    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === targetArr[i]) {
        result[i] = "bg-success";
        used[i] = true;
      }
    }

    // Second pass – yellows
    for (let i = 0; i < 5; i++) {
      if (result[i]) continue; // already marked green

      for (let j = 0; j < 5; j++) {
        if (!used[j] && guessArr[i] === targetArr[j]) {
          result[i] = "bg-warning";
          used[j] = true;
          break;
        }
      }
    }

    return result;
  };

  const checkGuess = (currentGuess, numGuesses) => {
    if (currentGuess === word) {
      Swal.fire({
        title: "You Win!",
        text: `You guessed the right word in ${numGuesses} attempts!`,
        icon: "success",
        confirmButtonText: "OK",
        theme: "dark",
      });
    }
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
                {Array.from({ length: 6 }).map((_, rowIdx) => {
                  // NOTE: we use curly braces for arrow function when you need to write
                  // multiple lines before returning the JSX, such as initializing the
                  // guess variable
                  const guess = guessed[rowIdx] || "";
                  const classList = getLetterStatus(guess);

                  return (
                    <tr key={rowIdx}>
                      {Array.from({ length: 5 }).map((_, colIdx) => {
                        const letter = guess[colIdx] || "";
                        const isActiveRow = rowIdx === guessed.length - 1;
                        const flipClass = isActiveRow ? "flip" : "";
                        return (
                          <td
                            key={colIdx}
                            className={`tile ${classList[colIdx]} ${flipClass}`}
                            style={
                              isActiveRow
                                ? { animationDelay: `${colIdx * 0.2}s` }
                                : {}
                            }
                          >
                            {letter}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
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
