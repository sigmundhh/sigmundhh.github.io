var g = 9.81, m = 10, dt = 0.01, r = 200, a = 0, v = 0, head_x = 150, head_y = 50;
var timerFunction = null;



function calculateTangentialForceOnTail(theta){
  return -m*g*Math.sin(theta)
}

function update(){
  f_tangent = calculateTangentialForceOnTail(theta);
  a = f_tangent/m;
  v = v + a*dt;
  omega = v/r;
  theta += omega * dt;
  setStringToAngle(theta);
}

var theta = Math.PI / 2;
var omega = 0;

/*
for (i = 0; i < 1000; i++){
  //document.getElementById("paragraph").innerHTML += "theta: " + theta + " a: " + a +  "<br>";
  update();
  setStringToAngle(theta);
  setInterval()
}*/

function startAnimation() {
  if(!timerFunction){
    timerFunction = setInterval(update, dt * 1000);
  } 
}

function stopAnimation(){
  if(timerFunction){
    //Want to pause the simulation here...
    clearInterval(timerFunction);
  }
}

function setStringToAngle(theta){
  tail_x = head_x + Math.sin(theta) * r;
  tail_y = head_y + Math.cos(theta) * r;
  scene.getElementById("string").setAttribute("x1", head_x);
  scene.getElementById("string").setAttribute("y1", head_y);
  scene.getElementById("string").setAttribute("x2", tail_x);
  scene.getElementById("string").setAttribute("y2", tail_y);
}
