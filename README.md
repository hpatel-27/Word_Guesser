# Word Guesser 🟩🟨⬜

A simple, interactive word game inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html). The user attempts to guess a randomly chosen five-letter word within six tries. After each guess, the game provides visual feedback indicating which letters are correct and whether they are in the correct position.

## ✨ Features

- 🎯 Random 5-letter word selection from a predefined list
- ⌨️ Input validation to ensure guesses are real words
- 🟩 Letter coloring for:
  - **Green**: correct letter in the correct position
  - **Yellow**: correct letter in the wrong position
  - **Gray**: incorrect letter
- 🔄 Flip animation on guess reveal (Wordle-style!)
- 🚫 SweetAlert2 popups for win/lose and invalid words

## 📦 Tech Stack

- React (functional components + hooks)
- Basic CSS for flip animations
- Bootstrap (for quick layout & styling)
- SweetAlert2 (for user alerts and win/loss modals)

## 🧠 How It Works

1. A random 5-letter word is selected when the app loads.
2. The user enters a word guess and submits it.
3. The app checks the word:
   - If it's valid, it gets added to the board and animated.
   - If it's the correct word, the user wins!
   - If the guess is invalid (not in the word list), an error message appears.
4. After 6 attempts, the game ends if the correct word hasn't been guessed.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/word_guesser.git
cd word_guesser
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

# 📁 Project Structure

```bash
├── public/
├── src/
│   ├── data/
│   │   └── five_letter_words.json
│   ├── index.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

# 🙌 Acknowledgments
- Inspired by the original Wordle
- Built for learning and fun 🎉
