import React, {useEffect, useRef} from 'react';
import useWindowSize from './useWindowSize';
import World from './model/world';

function App() {
  const { width, height } = useWindowSize();
  const CELLSIZE = 50;
  let world = new World(Math.floor(width / CELLSIZE), Math.floor(height / CELLSIZE));
  const canvasRef = useRef(null);
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

    world.setCell(row, col, true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect((col*CELLSIZE)+ leftRightMargin, (row*CELLSIZE) + topBottomMargin, CELLSIZE, CELLSIZE);

    console.log(world.getCell(row, col));
  }

  const handleResize = () => {
    console.log('Hello');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    world = new World(Math.floor(width / CELLSIZE), Math.floor(height / CELLSIZE));
    for(let x = leftRightMargin; x <= width - leftRightMargin; x += CELLSIZE) {
      drawLine(ctx, x, topBottomMargin, x, height - topBottomMargin);
    }
    for(let y = topBottomMargin; y <= width - topBottomMargin; y += CELLSIZE) {
      drawLine(ctx, leftRightMargin, y, width - leftRightMargin, y);
    }
  };

  useEffect(() => {
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
