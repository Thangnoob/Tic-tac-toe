export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} đã chọn dòng {turn.square.row} cột {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
