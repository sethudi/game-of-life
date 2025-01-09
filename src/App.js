import React, {useEffect, useRef} from 'react';
import useWindowSize from './useWindowSize';
import World from './model/world';

function App() {
  const { width, height } = useWindowSize();
  const canvasRef = useRef(null);
  const CELLSIZE = 50;
  const leftRightMargin = ((width % CELLSIZE) + CELLSIZE)/2;
	const topBottomMargin = ((height % CELLSIZE) + CELLSIZE)/2;
  

  const drawLine = (ctx, startX, startY, endX, endY) => {
    // Draw a line
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Start point
    ctx.lineTo(endX, endY);    // End point
    ctx.strokeStyle = 'rgb(134, 154, 189)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  const handleClick = (event) => {
    const col = Math.floor((event.clientX-leftRightMargin)/ CELLSIZE);
    const row= Math.floor((event.clientY-topBottomMargin) / CELLSIZE);
    console.log(row, col);
    fillCell((col*CELLSIZE)+ leftRightMargin, (row*CELLSIZE) + topBottomMargin);
  }

  const fillCell = (startX, startY) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(startX, startY, CELLSIZE, CELLSIZE);
    // let world = new World(width, height);
  }

  // const updateGrid = () => {
  //   // Update game logic here
  //   // For example, toggle cell state when clicked
  //   for (let i = 0; i < Math.floor(height / CELLSIZE); i++) {
  //     for (let j = 0; j < Math.floor(width / CELLSIZE); j++) {
        
  //       fillCell((i*CELLSIZE) + leftRightMargin, (j*CELLSIZE) + topBottomMargin);
  //     }
  //   }
  //   // const cell = getCell(col, row);
  //   // cell.alive =!cell.alive;
  //   // setGrid(grid);
  // }

  useEffect(() => {
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
        onClick={handleClick}
      />
  );
}
export default App;
