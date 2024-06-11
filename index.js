const pointer = document.getElementById("pointer");
const dinosaur = document.getElementById("dinosaur");
const dinosaurClick = document.getElementById("dinosaur-click");
// const resultContent = document.getElementById("hello-world");

const position = [
  ["128px", "576px", "80px", "initial"],
  ["408px", "1024px", "100px", "initial"],
  ["480px", "80px", "150px", "scale(-1, 1)"],
  ["-192px", "1280px", "350px", "rotate(-180deg) scale(-1, 1)"],
  ["32px", "-192px", "350px", "scale(-1, 1)"],
  ["600px", "1328px", "350px", "initial"],
  ["160px", "904px", "80px", "initial"],
  ["560px", "480px", "80px", "scale(-1, 1)"],
];

let mouseY;
let mouseX;
let stopMouse = false;

document.addEventListener("mousemove", (e) => {
  if (stopMouse) {
    e.stopPropagation();
  } else {
    mouseY = e.clientY - 95;
    mouseX = e.clientX - 95;

    pointer.style.maskPosition = `${mouseX}px ${mouseY}px`;
  }
});

dinosaurClick.addEventListener("click", (e) => {
  let size = 100;
  const maxSize = 2000;
  const expansionRate = 20;

  function animateCircle() {
    size += expansionRate;

    if (size <= maxSize) {
      const gradient = `radial-gradient(circle ${size}px at ${mouseX + 95}px ${
        mouseY + 95
      }px, rgba(255, 255, 255, 0) 100%, rgba(0, 0, 0, 1))`;

      pointer.style.background = gradient;
      stopMouse = true;

      requestAnimationFrame(animateCircle);
    }

    if (size >= maxSize) {
      stopMouse = false;
      // setTimeout(() => {
      //   resultContent.style.zIndex = 30;
      //   resultContent.style.opacity = 1;
      // }, 1000);
    }
  }

  animateCircle();
});

function moveDinosaur(index) {
  if (index >= position.length) {
    index = 0;
  }

  dinosaur.style.top = position[index][0];
  dinosaur.style.left = position[index][1];
  dinosaur.style.width = position[index][2];
  dinosaur.style.transform = position[index][3];

  dinosaurClick.style.top = position[index][0];
  dinosaurClick.style.left = position[index][1];
  dinosaurClick.style.width = position[index][2];
  dinosaurClick.style.transform = position[index][3];

  setTimeout(() => {
    moveDinosaur(index + 1);
  }, 1500);
}

moveDinosaur(0);
