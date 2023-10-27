let canvas = document.getElementById("airpods");
let context = canvas.getContext("2d");
let controller = new ScrollMagic.Controller();
let inner = document.querySelector(".inner-content");
let innerEnd = document.querySelector(".inner-content-end");
const frameCount = 3;

// Get Current Image
const currentFrame = (index) =>
  `assets/${index.toString().padStart(4, "0")}.jpg`;

// Set Image and Draw it
const img = new Image();
canvas.width = 1158;
canvas.height = 770;

// Initialize the image load and drawing function
const loadAndDrawImage = (index) => {
  img.src = currentFrame(index);
  img.onload = function () {
    context.drawImage(img, 0, 0);
  };
};

// Preload Images
const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    loadAndDrawImage(i);
  }
};

preloadImages();

const updateImageAndText = () => {
  const scrollTop = window.scrollY;
  const maxScrollTop =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  loadAndDrawImage(frameIndex + 1);

  if (scrollFraction > 0.2) {
    inner.classList.add("show");
    innerEnd.classList.add("show");
  } else {
    inner.classList.remove("show");
    innerEnd.classList.remove("show");
  }
};

let animationFrameId = null;

const handleScroll = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  animationFrameId = requestAnimationFrame(updateImageAndText);
};

window.addEventListener("scroll", handleScroll);

new ScrollMagic.Scene({
  duration: 9000,
  triggerElement: inner,
  triggerHook: 0,
})
  .setClassToggle(".inner-content", "show")
  .setPin(inner)
  .addTo(controller);

new ScrollMagic.Scene({
  duration: 9000,
  triggerElement: innerEnd,
  triggerHook: 0,
})
  .setClassToggle(".inner-content-end", "show")
  .setPin(innerEnd)
  .addTo(controller);
