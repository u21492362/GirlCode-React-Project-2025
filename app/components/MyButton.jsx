import { useState, useEffect } from "react";

export default function RockPaperScissors() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [message, setMessage] = useState("");
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const choices = ["Rock", "Paper", "Scissors"];

  const images = {
    Rock: "https://i.imgur.com/LghSkIw.png",
    Paper: "https://i.imgur.com/2gsdqvR.png",
    Scissors: "https://i.imgur.com/pgjyhIZ.png",
  };

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return "It's a tie! 🤝";

    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      const newPlayerScore = playerScore + 1;
      setPlayerScore(newPlayerScore);
      if (newPlayerScore === 5) {
        setGameOver(true);
        return "🎉 You reached 5 points and won the game!";
      }
      return "You win this round! 🎉";
    } else {
      const newComputerScore = computerScore + 1;
      setComputerScore(newComputerScore);
      if (newComputerScore === 5) {
        setGameOver(true);
        return "😢 Computer reached 5 points. Game over!";
      }
      return "Computer wins this round! 😢";
    }
  };

  const handleChoice = (choice) => {
    if (gameOver) return;

    const compChoice = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    const resultMessage = determineWinner(choice, compChoice);
    setMessage(resultMessage);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setMessage("");
    setPlayerChoice(null);
    setComputerChoice(null);
    setGameOver(false);
  };

  // Floating emojis
  const [emojis, setEmojis] = useState([
    { x: 100, y: 100, dx: 2, dy: 2, symbol: "🎮" },
    { x: 300, y: 200, dx: 3, dy: 2, symbol: "🕹️" },
    { x: 500, y: 150, dx: 2, dy: 3, symbol: "🎲" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojis((prev) =>
        prev.map((e) => {
          let newX = e.x + e.dx;
          let newY = e.y + e.dy;

          if (newX > window.innerWidth - 50 || newX < 0) e.dx = -e.dx;
          if (newY > window.innerHeight - 50 || newY < 0) e.dy = -e.dy;

          return { ...e, x: newX, y: newY };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", position: "relative" }}>
      {emojis.map((e, index) => (
        <div
          key={index}
          style={{
            position: "fixed",
            left: e.x,
            top: e.y,
            fontSize: "40px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {e.symbol}
        </div>
      ))}

      <h1>Rock, Paper, Scissors</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {choices.map((choice) => (
          <div
            key={choice}
            style={{
              cursor: gameOver ? "not-allowed" : "pointer",
              opacity: gameOver ? 0.5 : 1,
            }}
            onClick={() => handleChoice(choice)}
          >
            <img src={images[choice]} alt={choice} style={{ width: "100px" }} />
            <p>{choice}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          alignItems: "center",
        }}
      >
        <div>
          <h3>You</h3>
          {playerChoice && (
            <>
              <img src={images[playerChoice]} alt={playerChoice} style={{ width: "100px" }} />
              <p>{playerChoice}</p>
            </>
          )}
        </div>
        <div>
          <h3>Computer</h3>
          {computerChoice && (
            <>
              <img src={images[computerChoice]} alt={computerChoice} style={{ width: "100px" }} />
              <p>{computerChoice}</p>
            </>
          )}
        </div>
      </div>

      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        Your Score: {playerScore} | Computer Score: {computerScore}
      </p>

      {message && <p style={{ fontSize: "16px", color: "green" }}>{message}</p>}

      {gameOver && (
        <button
          onClick={resetGame}
          style={{ marginTop: "20px", fontSize: "16px", padding: "10px 20px" }}
        >
          🔄 Play Again
        </button>
      )}
    </div>
  );
}
