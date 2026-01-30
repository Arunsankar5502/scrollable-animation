const canvas = document.getElementById("heroCanvas");
const context = canvas.getContext("2d");

const frameCount = 200;
const currentFrame = index =>
  `Images/ezgif-1dd23721c96b77f7-jpg/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
let loadedImages = 0;
let currentFrameIndex = 0;

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    loadedImages++;
    if (loadedImages === 1) {
      drawFrame(1);
    }
  };
  images.push(img);
}

function drawFrame(index) {
  const img = images[index - 1];
  if (!img) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // cover canvas
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = canvas.width / 2 - (img.width / 2) * scale;
  const y = canvas.height / 2 - (img.height / 2) * scale;

  context.drawImage(
    img,
    x,
    y,
    img.width * scale,
    img.height * scale
  );
}

// Scroll → frame
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll =
    document.body.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  if (frameIndex !== currentFrameIndex) {
    currentFrameIndex = frameIndex;
    requestAnimationFrame(() => drawFrame(frameIndex + 1));
  }
});

// Resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawFrame(currentFrameIndex + 1);
});
