import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import PointExample from './PointExample';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <PointExample />
    </div>
  );
}

export default App;
