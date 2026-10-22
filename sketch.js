let x=400,y=250,t=0
let bodySize,speed
let r,g,b
let finSize,eyeSize
let moveX=90
let moveY=35
let reactDistance=180
let escapeDistance=110
function setup(){
  let cnv=createCanvas(800,500)
  cnv.parent("canvas-container")
  randomizeMelo()
}

function draw(){
  drawBackground()
  let d=dist(mouseX,mouseY,x,y)
  let react=map(d,reactDistance,0,0,1)
  react=constrain(react,0,1)
  t+=speed*(1+react*0.4)

  x=400+sin(t)*moveX
  y=250+cos(t*.8)*moveY

  if(d<escapeDistance){
    let a=atan2(y-mouseY,x-mouseX)
    let push=map(d,escapeDistance,0,0,25)

    x+=cos(a)*push
    y+=sin(a)*push
  }

  let size=bodySize+sin(t*4)*6
  size+=react*18

  drawGlow(x,y,size,react)
  drawCreature(x,y,size,react)
}


function drawBackground(){
  background(10,20,38)
  noStroke()

  fill(40,80,120,35)
  ellipse(400,250,650,400)

  fill(60,110,150,20)
  ellipse(400,250,450,280)

  fill(15,45,70,150)
  ellipse(100,520,350,150)
  ellipse(400,530,500,180)
  ellipse(720,520,400,160)

  for(let i=0;i<25;i++){
    let bx=(i*91+30)%width
    let by=height-((frameCount*(.3+(i%4)*.08)+i*65)%600)
    let bs=3+(i%5)*2

    let wiggle=sin(frameCount*.02+i)*12

    fill(130,200,255,60)
    circle(bx+wiggle,by,bs)
  }

  for(let i=0;i<30;i++){
    let sx=(i*73+20)%width
    let sy=(i*49+25)%height
    let glow=80+sin(frameCount*.04+i)*50

    fill(190,225,255,glow)
    circle(sx,sy,2)
  }
}


function drawGlow(x,y,s,react){
  noStroke()

  let glow=25+react*65

  fill(r,g,b,glow/4)
  ellipse(x,y,s+60)

  fill(r,g,b,glow/3)
  ellipse(x,y,s+40)

  fill(r,g,b,glow/2)
  ellipse(x,y,s+20)
}


function drawCreature(x,y,s,react){
  push()
  translate(x,y)

  let finSpeed=5+react*3
  let finMove=sin(t*finSpeed)*8

  noStroke()

  fill(max(r-30,0),max(g-30,0),max(b-10,0))

  triangle(
    -s*.42,-s*.05,
    -s*.42-finSize,-finSize*.6-finMove,
    -s*.30-finSize*.4,finSize*.6+finMove
  )

  triangle(
    s*.42,-s*.05,
    s*.42+finSize,-finSize*.6+finMove,
    s*.30+finSize*.4,finSize*.6-finMove
  )

  fill(
    min(r+react*30,255),
    min(g+react*30,255),
    min(b+react*20,255)
  )

  ellipse(0,0,s,s*.88)

  fill(min(r+45,255),min(g+40,255),min(b+30,255),120)
  ellipse(0,s*.1,s*.62,s*.43)

  fill(255,80)
  ellipse(-s*.2,-s*.24,s*.18,s*.12)

  drawEyes(s)

  noFill()
  stroke(50,40,70,180)
  strokeWeight(3)
  arc(0,s*.17,s*.18,s*.1,0,PI)

  pop()
}


function drawEyes(s){
  let angle=atan2(mouseY-y,mouseX-x)

  let px=cos(angle)*3
  let py=sin(angle)*3

  let left=-s*.19
  let middle=0
  let right=s*.19

  let sideY=-s*.07
  let middleY=-s*.17

  noStroke()
  fill(245)

  circle(left,sideY,eyeSize*1.7)
  circle(middle,middleY,eyeSize*1.7)
  circle(right,sideY,eyeSize*1.7)

  fill(25,30,50)

  circle(left+px,sideY+py,eyeSize)
  circle(middle+px,middleY+py,eyeSize)
  circle(right+px,sideY+py,eyeSize)

  fill(255)

  circle(left+px-2,sideY+py-2,eyeSize*.25)
  circle(middle+px-2,middleY+py-2,eyeSize*.25)
  circle(right+px-2,sideY+py-2,eyeSize*.25)
}


function mousePressed(){
  let d=dist(mouseX,mouseY,x,y)

  if(d<bodySize){
    randomizeMelo()
  }
}


function randomizeMelo(){
  bodySize=random(70,110)
  speed=random(.01,.03)

  finSize=random(20,50)
  eyeSize=random(8,18)

  r=random(100,220)
  g=random(120,230)
  b=random(160,255)
}
