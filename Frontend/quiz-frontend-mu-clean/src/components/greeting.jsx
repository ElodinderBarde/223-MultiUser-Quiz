/**
 * Simple greeting component
 * @param {name} param0
 * @returns
 */
const Greeting = ({ name }) => {
  if (!name) {
    return (
      <div>
        <h1>Hello, Player 456!</h1>
        <p>Welcome back to the game!</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome back to the game!</p>
    </div>
  );
};

export default Greeting;
