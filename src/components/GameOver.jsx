export default function GameOver({ winner, onReset }) {
  return (
    <div id="game-over">
      {winner ? <p>You won, {winner}!</p> : <p>It's a draw</p>}
      <button onClick={onReset}>Rematch!</button>
    </div>
  );
}
