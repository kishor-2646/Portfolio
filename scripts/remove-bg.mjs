import sharp from "sharp";
import { resolve } from "path";

const INPUT  = resolve("public/potrait.png");
const OUTPUT = resolve("public/potrait-clean.png");

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const C = 4;
const buf = new Uint8Array(data.buffer);

console.log("Image:", width, "x", height);
console.log("top-left pixel before:", buf[0], buf[1], buf[2], "a:", buf[3]);

// Background is BLACK (0,0,0). Flood fill from edges through near-black pixels.
// Person's darkest clothing edges are typically > 15 in at least one channel.
const DARK_THRESH = 18; // pixels are "bg" if all channels < this value

function isBg(x, y) {
  const i = (y * width + x) * C;
  return buf[i] < DARK_THRESH && buf[i+1] < DARK_THRESH && buf[i+2] < DARK_THRESH;
}

const visited = new Uint8Array(width * height);
const Q = [];

function seed(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const pi = y * width + x;
  if (visited[pi]) return;
  if (isBg(x, y)) { visited[pi] = 1; Q.push(x, y); }
}

for (let x = 0; x < width;  x++) { seed(x, 0); seed(x, height-1); }
for (let y = 0; y < height; y++) { seed(0, y); seed(width-1, y); }

console.log("Seeds:", Q.length / 2);

const DX = [-1,1,0,0], DY = [0,0,-1,1];
for (let qi = 0; qi < Q.length; qi += 2) {
  const cx = Q[qi], cy = Q[qi+1];
  buf[(cy * width + cx) * C + 3] = 0; // transparent
  for (let d = 0; d < 4; d++) seed(cx + DX[d], cy + DY[d]);
}

console.log("top-left pixel after:", buf[0], buf[1], buf[2], "a:", buf[3]);

await sharp(Buffer.from(buf), { raw: { width, height, channels: C } })
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT);

console.log("Done ->", OUTPUT);
