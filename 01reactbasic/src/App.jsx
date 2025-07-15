import { log } from './utils/logger';

function App() {
  const handleClick = () => {
    log("frontend", "info", "component", "Button clicked on home page");
  };

  return (
    <button onClick={handleClick}>Log Button Click</button>
  );
}
