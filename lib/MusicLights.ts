const audioCtx = new AudioContext();

export type MusicLightsOptions = {
  fftSize?: number;
};

export type VisualizerFn = (dataArray: Uint8Array, ctx: Context2D) => void;

export function MusicLights(
  el: HTMLAudioElement,
  canvas: HTMLCanvasElement,
  options: MusicLightsOptions = {},
) {
  const visualizers: VisualizerFn = [];

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = options?.fftSize ?? 128;
  analyser.connect(audioCtx.destination);

  const ctx = canvas.getContext("2d");

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  function render() {
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // logo.style.setProperty("scale", 1 + deviation * 0.5);
    // logo.style.setProperty("rotate", rotation + "deg");
    // central.style.setProperty("--hue", hue);
    // central.style.setProperty("--movement", averageRunning / 128);

    for (const visualizer of visualizers) {
      visualizer(dataArray, ctx);
    }
    requestAnimationFrame(render);
  }

  el.addEventListener(
    "play",
    () => {
      const source = audioCtx.createMediaElementSource(el);
      source.connect(analyser);
      render();
    },
    { once: true },
  );
  return {
    addVisualizer: (visualizer: VisualizerFn) => {
      visualizers.push(visualizer);
    },
  };
}
