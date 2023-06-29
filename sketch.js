const canvasSize = 500;
//const canvas = document.getElementById('canvas1');
//const ctx = canvas.getContext('2d');
let particles = [];
let noiseScale = 100;
let num = 1000;
let EPSILON = 0.001;

function setup() {
  createCanvas(canvasSize, canvasSize);
  //noLoop();
  noiseDetail(1,0);
  genNoiseImg();
  //image(noiseImg, 0, 0);
  for(let i=0 ; i<num ; i++){
    let particle = new Object();
    particle.pos = createVector(random(width),random(height));
    particles.push(particle)
  }
}

function draw() {
  
  image(noiseImg, 0, 0);
  tint(255,10);
  strokeWeight(4);
  stroke(255);

  for(let i=0 ; i<num ; i++){
    let p = particles[i];
    p.pos.add(curl(p.pos.x/noiseScale,p.pos.y/noiseScale));
    point(p.pos.x, p.pos.y);
  }
}

function genNoiseImg() {
  noiseImg = createGraphics(width, height);
  noiseImg.loadPixels();
  let widthd = width*pixelDensity();
  let heightd = height*pixelDensity();
  for(let i=0 ; i<widthd ; i++){
    for(let j=0 ; j<heightd ; j++){
      let x = i/pixelDensity();
      let y = j/pixelDensity();
      let bright = pow(noise(x/noiseScale, y/noiseScale)-0.3, 1/2.0)*400;
      noiseImg.pixels[(i+j*widthd)*4] = bright;
      noiseImg.pixels[(i+j*widthd)*4+1] = bright;
      noiseImg.pixels[(i+j*widthd)*4+2] = bright;
      noiseImg.pixels[(i+j*widthd)*4+3] = 255;
    }
  }
  noiseImg.updatePixels();
}

function curl(x,y){
  let n1 = noise(x+EPSILON,y);
  let n2 = noise(x-EPSILON,y);
  let dx = (n1 - n2)/(2*EPSILON);
  n1 = noise(x,y+EPSILON);
  n2 = noise(x,y-EPSILON);
  let dy = (n1 - n2)/(2*EPSILON);
  //return createVector(dx,dy);
  return createVector(dy,-dx);
}

