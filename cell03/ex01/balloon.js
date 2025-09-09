const balloon = document.getElementById("balloon");

// Colors in forward cycle
const colors = ["red", "green", "blue"];
let colorIndex = 0;
let size = 200;

balloon.addEventListener("click", () => {
  size += 10;
  colorIndex = (colorIndex + 1) % colors.length;

  if (size > 420) {
    // Explode: reset
    size = 200;
    colorIndex = 0;
  }

  updateBalloon();
});

balloon.addEventListener("mouseleave", () => {
  if (size > 200) {
    size -= 5;
  }
  colorIndex = (colorIndex - 1 + colors.length) % colors.length;
  updateBalloon();
});

function updateBalloon() {
  balloon.style.width = size + "px";
  balloon.style.height = size + "px";
  balloon.style.backgroundColor = colors[colorIndex];
}
