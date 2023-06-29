const canvasWidth = 800;
const canvasHeight = 400;
let particles = [];
let noiseScale = 70;
let num = 500;
const PARTICLE_SIZE = 10;
const RESOLUTION = 10;
const MAX_FORCE = 10;
const MIN_FORCE = 0;

let imgUrl = './src/eye_blender.png'
let img;
function preload(){
    img = loadImage(imgUrl);
}
function setup(){
    createCanvas(canvasWidth, canvasHeight);
    spawnParticles();
}

function draw(){
    background(40);
    //image(img, 0, 0,canvasWidth,canvasHeight);
    /* for(let i=0;i<particles.length;i++){
        particles[i].draw();
    } */
    particles.forEach((particle) =>{
        particle.update();
        particle.draw();
    })
}

function spawnParticles(){
    for(let i=0; i<=1200; i+=RESOLUTION){
        for(let j=0; j<=630; j+=RESOLUTION){
            let x = (i/canvasWidth)*img.width;
            let y = (j/canvasHeight)*img.height;
            const color = img.get(x,y);
            particles.push(new Particle(i+PARTICLE_SIZE/2,j+PARTICLE_SIZE/2,color));
        }
    }
}
class Particle{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.targetX = x;
        this.targetY = y;
    }
    
    update(){
        let mouseVector = createVector(mouseX,mouseY);
        let currentVector = createVector(this.x,this.y);
        let targetVector = createVector(this.targetX,this.targetY);

        let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
        let distanceToMouse = fromMouseToParticle.mag();

        let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);
        let distanceToTarget = fromParticleToTarget.mag();

        let totalForce = createVector(0,0)

        if(distanceToMouse < 70){
            let repulsionForce = map(distanceToMouse, 0, 70, MAX_FORCE, MIN_FORCE);
            fromMouseToParticle.setMag(repulsionForce);
            totalForce.add(fromMouseToParticle);
        }

        if(distanceToMouse > 0){
            let attractionForce = map(distanceToTarget, 0, 70, MIN_FORCE, MAX_FORCE);
            fromParticleToTarget.setMag(attractionForce);
            totalForce.add(fromParticleToTarget);
        }
        
        this.x += totalForce.x;
        this.y += totalForce.y;
    }

    draw(){
        fill(this.color);
        //noStroke();
        ellipse(this.x,this.y,PARTICLE_SIZE);
    }
}