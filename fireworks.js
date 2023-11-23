// fireworks.js

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let clicked = false;
let mouseX = 0,
  mouseY = 0;
let particles = [];
let particleSettings = {
  gravity: 0.05,
};
let timer = 0; // Variable to keep track of elapsed time
let maxDuration = 5; // Maximum duration in seconds

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

canvas.addEventListener(events[deviceType].down, function (e) {
  e.preventDefault();
  clicked = true;
  mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
  mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
});

canvas.addEventListener(events[deviceType].up, function (e) {
  e.preventDefault();
  clicked = false;
});

function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

function Particle() {
  this.width = randomNumberGenerator(0.1, 0.9) * 5;
  this.height = randomNumberGenerator(0.1, 0.9) * 5;
  this.x = mouseX - this.width / 2;
  this.y = mouseY - this.height / 2;

  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;
}

Particle.prototype = {
  move: function () {
    if (this.x >= canvas.width || this.y >= canvas.height) {
      return false;
    }
    return true;
  },
  draw: function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += particleSettings.gravity;
    context.save();
    context.beginPath();
    context.translate(this.x, this.y);
    context.arc(0, 0, this.width, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.closePath();
    context.fill();
    context.restore();
  },
};

function createFirework() {
  var numberOfParticles = randomNumberGenerator(10, 50);
  let color = `rgb(${randomNumberGenerator(0, 255)},${randomNumberGenerator(
    0,
    255,
  )},${randomNumberGenerator(0, 255)})`;

  for (var i = 0; i < numberOfParticles; i++) {
    var particle = new Particle();
    particle.color = color;
    var vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

function startFirework() {
  createFirework();
  clicked = true;
  mouseX = randomNumberGenerator(0, width);
  mouseY = randomNumberGenerator(0, height);
}

function clearCanvas() {
  context.clearRect(0, 0, width, height);
}

function initFireworks() {
  window.requestAnimationFrame(startFirework);

  // Set up an interval to update the timer
  const timerInterval = setInterval(() => {
    timer += 0.1; // Increment by 0.1 seconds
  }, 100);

  canvas.addEventListener(events[deviceType].down, function (e) {
    e.preventDefault();
    clicked = true;
    mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
    mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
  });

  canvas.addEventListener(events[deviceType].up, function (e) {
    e.preventDefault();
    clicked = false;
  });

  function animate() {
    let current = [];

    // let gradient = context.createLinearGradient(0, 0, 0, height);
    // gradient.addColorStop(0, "rgba(0, 0, 1, 0.1)");
    // gradient.addColorStop(1, "rgba(0, 43, 71, 0.1)");

    context.fillStyle = "#f9f9f9";

    context.fillRect(0, 0, width, height);
    if (clicked) {
      createFirework();
    }
    for (let i in particles) {
      particles[i].draw();
      if (particles[i].move()) {
        current.push(particles[i]);
      }
    }
    particles = current;

    // Check if the timer exceeds the maximum duration
    if (timer >= maxDuration) {
      clearInterval(timerInterval); // Stop the interval
      clearCanvas(); // Clear the canvas
      timer = 0; // Reset the timer
      return; // Stop the animation loop
    }

    window.requestAnimationFrame(animate);
  }

  animate();
}
