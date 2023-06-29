const canvasSize = 500;
//const canvas2 = document.getElementById('canvas2');
//const ctx2 = canvas2.getContext('2d');
let num2 = 50;
function setup(){
    createCanvas(canvasSize, canvasSize, WEBGL);
    angleMode(DEGREES);
}

function draw(){
    background(30);
    rotateX(60);
    noFill();
    stroke(255);
    for(let i=0; i<num2; i++){
        let r = map(sin(frameCount),-1,0,255,0) ;
        let g = map(i,0,20,0,255);
        let b = map(cos(frameCount),-1,0,0,255);
        stroke(r,g,b);
        rotate(frameCount/30)
        beginShape();
        for(let j=0; j<=360; j+=60){
            let rad = i*4;
            let x = rad*cos(j);
            let y = rad*sin(j);
            let z = sin(frameCount*4 + i*5)*50;
            vertex(x,y,z);//x,y座標に一個前の点から線を引く　j+=10であれば36分割
        }
        endShape();
    }
}