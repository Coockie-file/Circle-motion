const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

canvas.width  = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

// random color generator
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const mouse = {
  x: 300,
  y: 300
};

document.addEventListener('mousemove', function(event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  console.log('Денис пидор');
});



class Circle {

  constructor(x, y, velocity, distanceFromCenter, radius, color) {

    this.x        = x;        // X position
    this.y        = y;        // Y position
    this.velocity = velocity; // moving velocity 
    this.radians  = Math.random() * Math.PI;        // radians for cos and sin functions
    this.distanceFromCenter = distanceFromCenter; 
    this.radius   = radius;   // circle's radius
    this.color    = color;    // circle's color
    this.lastMouse = {x: x, y: y};

    this.update = function() {x
      const lastPoint = {x : this.x, y : this.y};

      this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
      this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

      this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
      this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

      this.radians += this.velocity;
      this.draw(lastPoint);
    };

    this.draw = lastPoint =>  {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(this.x, this.y);
      ctx.lineWidth = this.radius;
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.closePath();
    };

  }

}

// random interger generator
function randomInteger(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let arr = [];

for(let i = 0; i < 100; i++) {
  let velocity = (Math.random() - 0.5) / 10 ;
  let distanceFromCenter = randomInteger(20, 200);
  let radius = randomInteger(1, 4);
  let color = getRandomColor();

  arr.push(new Circle(canvas.width / 2, canvas.height / 2, velocity, distanceFromCenter, radius, color));
}

function animate() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  arr.forEach(item => item.update());

  requestAnimationFrame(animate);
}
animate();