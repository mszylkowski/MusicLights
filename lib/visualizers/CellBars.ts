export type CellBarsOptions = {
  /** How many degrees of hue to change per second **/
  huePerSecond?: number;
  /** Starting hue value **/
  hue?: number;
};

export function CellBars(options: CellBarsOptions = {}) {
  let hue = options?.hue ?? -50;
  let huePerMs = (options?.huePerSecond ?? 5) * 0.001;

  let lastTime = performance.now();
  let averageRunning = 0;

  return (dataArray: Uint8Array, ctx: Context2D) => {
    const deltaTime = performance.now() - lastTime;
    lastTime = performance.now();

    const average =
      dataArray.reduce((prev, curr) => prev + curr, 0) / dataArray.length;
    averageRunning = 0.9 * averageRunning + 0.1 * average;
    const deviation = (average - averageRunning) / 128;
    hue += huePerMs * deltaTime * (1 + deviation);
    if (hue > 360) hue -= 360;

    const bufferLength = dataArray.length;
    const { width, height } = ctx.canvas;
    const cellWidth = Math.floor((width / bufferLength) * 0.65);
    const barWidth = cellWidth - 1;
    const visualizerHeight = (height * 0.4) / 256;

    for (let i = 0; i < bufferLength; i++) {
      const x = barWidth * i;
      const barHeight = Math.floor(dataArray[i] * visualizerHeight);
      const cells = Math.round(barHeight / cellWidth);
      for (let j = 0; j < cells; j++) {
        ctx.fillStyle = `hsla(${hue - (i / bufferLength) * 150}, 100%, 50%, ${(j / cells) * 50 + 50 - Math.pow(i / bufferLength, 0.5) * 50}%)`;
        const y = height * 0.5 + cellWidth * j;
        const y2 = height * 0.5 - cellWidth * j;
        if (j > 0) {
          if (i > 0) {
            ctx.fillRect(width * 0.5 + x, y, barWidth - 1, barWidth);
          }
          ctx.fillRect(width * 0.5 - x, y, barWidth - 1, barWidth);
        }
        if (i > 0) {
          ctx.fillRect(width * 0.5 + x, y2, barWidth - 1, barWidth);
        }
        ctx.fillRect(width * 0.5 - x, y2, barWidth - 1, barWidth);
      }
    }
  };
}
