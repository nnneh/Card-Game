# Card Battle Game

A simple and engaging card game built with React, where you battle against the computer by choosing a card with a higher value.

---

## Features

* **Interactive Gameplay**: Choose your card and watch the battle unfold.
* **Dynamic Scoring**: Keeps track of your wins, losses, and draws.
* **Game History**: Review your last 5 game outcomes.
* **Responsive Design**: Enjoy the game on various screen sizes.
* **Clear Visuals**: Cards change color based on their type (face cards, high numbers, low numbers).
* **Play Again & Reset**: Easily restart a round or reset the entire game and scores.

---

## How to Play

1.  **Choose Your Card**: Select one of the available cards displayed on the screen.
2.  **Computer's Turn**: The computer will then randomly select its card.
3.  **See the Result**: The game compares the values of your card and the computer's card:
    * **WIN**: If your card's value is higher.
    * **LOST**: If your card's value is lower.
    * **DRAW**: If both cards have the same value.
4.  **Track Your Score**: Your wins, losses, and draws are updated in real-time on the scoreboard.
5.  **Review History**: The "Recent Games" section shows the last 5 battles.
6.  **Next Round**: Click "Play Again" to start a new round with the current scores, or "Reset Game" to clear scores and history.

---

## Card Values

The game uses standard card values, with face cards having higher values:

* **A (Ace)**: 13
* **K (King)**: 12
* **Q (Queen)**: 11
* **J (Jack)**: 10
* **10**: 9
* **9**: 8
* **8**: 7
* **7**: 6
* **6**: 5
* **5**: 4
* **4**: 3
* **3**: 2
* **2**: 1

---

## Technologies Used

* **React.js**: For building the user interface.
* **Tailwind CSS**: For rapid and responsive styling.
* **Lucide React**: For icons.

---

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <https://github.com/nnneh/Card-Game.git>
    cd card-Game
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the game.