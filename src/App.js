import React from 'react';
import useWindowSize from './useWindowSize';

function App() {
  const { width, height } = useWindowSize();
    
  return (
      <div>
          <h1>Window Size</h1>
          <p>Width: {width}px</p>
          <p>Height: {height}px</p>
      </div>
  );
}
export default App;
