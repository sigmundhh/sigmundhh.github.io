var g = 9.81, m_parent = 10, dt = 0.01, r = 200, a_parent = 0, v_parent = 0, head_x = 300,
head_y = 50,height, width, isPlaying = false, theta = Math.PI / 2, omega_parent = 0,
scale = 0.01, acc_angle = 0,
//Air resistance
k = 5,
//Joint and ball
joint_x, joint_y, ball_x, ball_y;
var gamma;


var timerFunction = null;

if (window.DeviceMotionEvent == undefined) {
  //No accelerometer is present. Use buttons. 
  alert("no accelerometer");
}
else {
  alert("accelerometer found");
  window.addEventListener("devicemotion", accelerometerUpdate, true)
  // Set acc_angle to be what it is now? Or just have an offset? 
  // Acc_angle seems to be the angle of the downward acceleration, we should maybe have an offset
  // acc_angle = 
}



function accelerometerUpdate() {
  var aX = event.accelerationIncludingGravity.x*1;
  var aY = event.accelerationIncludingGravity.y*1;
  var aZ = event.accelerationIncludingGravity.z*1;
  //The following two lines are just to calculate a
  // tilt. Not really needed. 
  xPosition = Math.atan2(aY, aZ);
  yPosition = Math.atan2(aX, aZ);
  //Calculate the angle from the vertical. The Pi is just to compensate for that my PC is weird
  acc_angle = Math.atan2(xPosition, yPosition) + Math.PI/2
}

function calculateTangentialForceOnTail(theta, m){
  return -m*g*Math.sin(theta-acc_angle);
}

function calculateRadialForceOnTail(theta, m){
  return -m*g*Math.cos(theta);
}

function caclulateAirResistance(){
  return k* v_parent;
}

function updateParentPosistion(e){
  g_tangent = calculateTangentialForceOnTail(theta, m_parent);
  f_air = caclulateAirResistance();
  a_parent = (g_tangent - f_air)/m_parent;
  v_parent = v_parent + a_parent*dt;
  omega_parent = v_parent/(r*scale);
  theta += omega_parent * dt;
}


function update(){
  updateParentPosistion();
  setStringParentToAngle(theta);
  placeJoint();
}

function placePendulum(){
  width = screen.width * 0.75;
  scene.setAttribute("width", width);
  height = scene.getAttribute("height");
  head_x = width / 2;
  head_y = 4;

}

/*
//Debug
for (i = 0; i < 1000; i++){
  //document.getElementById("paragraph").innerHTML += "theta: " + theta + " a_parent: " + a_parent +  "<br>";
  update();
  setStringToAngle(theta);
  setInterval()
}*/

function startAnimation() {
  if(!timerFunction || !isPlaying){
    timerFunction = setInterval(update, dt);
    isPlaying = true;
  } 
}

function stopAnimation(){
  if(timerFunction){
    //Want to pause the simulation here...
    clearInterval(timerFunction);
    isPlaying = false;
  }
}

function setStringParentToAngle(theta){
  tail_x = head_x + Math.sin(theta) * r;
  tail_y = head_y + Math.cos(theta) * r;
  //Set the parent string tail to the x and y coordinatees. 
  scene.getElementById("string_parent").setAttribute("x1", head_x);
  scene.getElementById("string_parent").setAttribute("y1", head_y);
  scene.getElementById("string_parent").setAttribute("x2", tail_x);
  scene.getElementById("string_parent").setAttribute("y2", tail_y);
}

function placeJoint(){
  joint_x = tail_x;
  joint_y = tail_y;
  scene.getElementById("joint").setAttribute("cx", joint_x);
  scene.getElementById("joint").setAttribute("cy", joint_y);
}


placePendulum();
theta = Math.PI * (1/2);

setStringParentToAngle(theta);
placeJoint();



//update();

//timerFunction = setInterval(updateParentPosistion(), dt * 1000);


