const pointer = document.getElementById("pointer");
const dinosaur = document.querySelector(".dinosaur");
const dinosaurClick = document.querySelector(".dinosaur-click");

const position = [
  "margin-top: -160px; margin-right: -750px; width: 80px; transform: initial;",
  "margin-top: -290px; margin-left: -850px; width: 280px; transform: scale(-1, 1);",
  "margin-bottom: -430px; margin-left: -210px; width: 80px; transform: initial;",
  "margin-right: -290px;  margin-bottom: -410px; width: 80px; transform: scale(-1, 1);",
  "margin-left: -1580px;  margin-top: -300px; width: 350px; transform: scale(-1, 1);",
  "margin-right: -1580px;  margin-bottom: -600px; width: 350px; transform: initial;",
  "margin-right: -1300px;  margin-top: -750px; width: 350px; transform: rotate(-180deg) scale(-1, 1);",
  "margin-left: -1070px;  margin-top: 50px; width: 80px; transform: scale(-1, 1);",
];

let mouseY;
let mouseX;
let stopMouse = false;

document.addEventListener("mousemove", (e) => {
  if (stopMouse) {
    e.stopPropagation();
  } else {
    mouseY = e.clientY - 145;
    mouseX = e.clientX - 145;

    pointer.style.maskPosition = `${mouseX}px ${mouseY}px`;
  }
});

dinosaurClick.addEventListener("click", (e) => {
  let size = 150;
  const maxSize = 2000;
  const expansionRate = 50;

  function animateCircle() {
    size += expansionRate;

    if (size <= maxSize) {
      const gradient = `radial-gradient(circle ${size}px at ${mouseX + 145}px ${
        mouseY + 145
      }px, rgba(255, 255, 255, 0) 100%, rgba(0, 0, 0, 1))`;

      pointer.style.background = gradient;
      stopMouse = true;

      requestAnimationFrame(animateCircle);
    }

    if (size >= maxSize) {
      stopMouse = false;
    }
  }

  animateCircle();
});

function moveDinosaur(index) {
  if (index >= position.length) {
    index = 0;
  }

  dinosaur.style.cssText = position[index];
  dinosaurClick.style.cssText = position[index];

  setTimeout(() => {
    moveDinosaur(index + 1);
  }, 1500);
}

moveDinosaur(0);
