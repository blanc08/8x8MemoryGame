interface propsInterface {
  winner: string;
  turn: string;
}
export default function Status(props: propsInterface) {
  const { winner, turn } = props;

  //   if there's a winner
  if (winner) {
    return (
      <p className="mb-4">
        Winner:
        {'  '}
        <span className="text-gray-900">{winner}</span>
      </p>
    );
  }

  return (
    <p className="mb-4">
      Turns:
      {'  '}
      <span className="text-gray-900">{turn}</span>
    </p>
  );
}
