let canvas = document.getElementById("airpods");
let context = canvas.getContext("2d");
let controller = new ScrollMagic.Controller();
let inner = document.querySelector(".inner-content");
let innerEnd = document.querySelector(".inner-content-end");
let frameCount = 148;

// Get Current Image
let currentFrame = (index) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
    .toString()
    .padStart(4, "0")}.jpg`;

// Set Image and Draw it
let img = new Image();
canvas.width = 1158;
canvas.height = 770;

const updateImage = (index) => {
  img.src = currentFrame(index);
  img.onload = function () {
    context.drawImage(img, 0, 0);
  };
};

// Preload Images
const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

preloadImages();

// Function to update the image and reveal the text
const updateImageAndText = () => {
  const scrollTop = window.scrollY;
  const maxScrollTop =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  updateImage(frameIndex + 1);

  if (scrollFraction > 0.5) {
    inner.classList.add("show");
    innerEnd.classList.add("show");
  } else {
    inner.classList.remove("show");
    innerEnd.classList.remove("show");
  }
};

window.addEventListener("scroll", updateImageAndText);

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
