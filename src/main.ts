import "./style.css";
import { MusicLights } from "../lib/MusicLights.ts";
import { CellBars } from "../lib/visualizers/CellBars.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
		<audio src="../samples/On & On.mp3" controls></audio>
		<canvas class="fullscreen"/>
  </div>
`;

const audioEl = document.querySelector("audio");
const canvasEl = document.querySelector("canvas");
const { width, height } = canvasEl.getBoundingClientRect();
canvasEl.width = width;
canvasEl.height = height;
MusicLights(audioEl, canvasEl).addVisualizer(CellBars());
