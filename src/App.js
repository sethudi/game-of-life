import React, {useEffect, useRef} from 'react';
import useWindowSize from './useWindowSize';

function App() {
  const { width, height } = useWindowSize();
  const canvasRef = useRef(null);
  const CELLSIZE = 50;
  

  const drawLine = (ctx, startX, startY, endX, endY) => {
    // Draw a line
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Start point
    ctx.lineTo(endX, endY);    // End point
    ctx.strokeStyle = 'rgb(134, 154, 189)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  useEffect(() => {
    const leftRightMargin = ((width % CELLSIZE) + CELLSIZE)/2;
	  const topBottomMargin = ((height % CELLSIZE) + CELLSIZE)/2;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle ='#282c34';
    ctx.fillRect(0, 0, width, height);
    // Clear previous drawings
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Listen for window resize events
    // Draw a line when window is resized to maintain aspect ratio and centered on the canvas
    // This line is a simple representation of the window edges and does not represent the actual game logic or state
    const handleResize = () => {
   
      for(let x = leftRightMargin; x <= width - leftRightMargin; x += CELLSIZE) {
        drawLine(ctx, x, topBottomMargin, x, height - topBottomMargin);
      }
      
      for(let y = topBottomMargin; y <= width - topBottomMargin; y += CELLSIZE) {
        drawLine(ctx, leftRightMargin, y, width - leftRightMargin, y);
      }
    };

    window.addEventListener('resize', handleResize);

    // Draw a line on app mount
    handleResize();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);


  return(
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
      />
  );
}
export default App;
