import { useState } from "react";

export default function MyButtonGame() {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    // Increase score
    const newScore = score + 1;
    setScore(newScore);

    // Random bonus chance
    const bonus = Math.random() < 0.2; // 20% chance
    if (bonus) {
      setMessage("🎉 Lucky! Bonus point added!");
      setScore(newScore + 1); // extra point
      return;
    }

    // Milestone messages
    if (newScore === 10) {
      setMessage("✨ You reached 10 clicks! Great job!");
    } else if (newScore === 20) {
      setMessage("🚀 20 clicks! You're unstoppable!");
    } else if (newScore === 30) {
      setMessage("🏆 30 clicks! You win!");
    } else {
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Click Game!</h1>
      <button onClick={handleClick} style={{ fontSize: "20px", padding: "10px 20px" }}>
        I'm a button
      </button>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>Score: {score}</p>
      {message && <p style={{ fontSize: "16px", color: "green" }}>{message}</p>}
    </div>
  );
}
