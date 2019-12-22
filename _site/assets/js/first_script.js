var g = 9.81, m_parent = 10, dt = 0.01, r = 200, a_parent = 0, v_parent = 0, head_x = 150,
a_child, v_child, m_child = 100, omega_child = 0,
head_y = 50,height, width, isPlaying = false, theta = Math.PI / 2, omega_parent = 0,
r_child = 100, head_child_x, head_child_y, tail_child_x, tail_child_y,
//Phi is the angle from vertical to string_child
phi,
//Joint and ball
joint_x, joint_y, ball_x, ball_y;

var timerFunction = null;

function calculateTangentialForceOnTail(theta, m){
  return -m*g*Math.sin(theta);
}

function calculateRadialForceOnTail(theta, m){
  return -m*g*Math.cos(theta);
}


function calculateForceFromChildToParent(theta, phi){
  // Calculate the radial force acting on parent from child. This is just the radial component of gravity
  // on the child pedulum
  angle_parent_to_child = theta - phi;
  // I have no idea if this works
  return calculateRadialForceOnTail(phi, m_child) * Math.sin(angle_parent_to_child); 
}

function updateParentPosistion(){
  g_tangent = calculateTangentialForceOnTail(theta, m_parent);
  f_tangent_from_child = calculateForceFromChildToParent(theta, phi);
  a_parent = (g_tangent + f_tangent_from_child)/m_parent;
  v_parent = v_parent + a_parent*dt;
  omega_parent = v_parent/r;
  theta += omega_parent * dt;
}

function updateChildPosistion(){
  g_tangent = calculateTangentialForceOnTail(phi, m_child);
  f_tangent_from_parent = -calculateForceFromChildToParent(theta, phi);
  a_child = (g_tangent + f_tangent_from_parent)/m_child;
  v_child = v_child + a_child*dt;
  omega_child = v_child/r;
  phi += omega_child * dt;
}

function update(){
  updateParentPosistion();
  updateChildPosistion();
  setStringParentToAngle(theta);
  setStringChildToAngle(phi);
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

function setStringChildToAngle(phi){
  head_child_x = tail_x;
  head_child_y = tail_y;
  tail_child_x = head_child_x + Math.sin(phi) * r_child;
  tail_child_y = head_child_y + Math.cos(phi) * r_child;
  scene.getElementById("string_child").setAttribute("x1", head_child_x);
  scene.getElementById("string_child").setAttribute("y1", head_child_y);
  scene.getElementById("string_child").setAttribute("x2", tail_child_x);
  scene.getElementById("string_child").setAttribute("y2", tail_child_y);
}

placePendulum();
theta = Math.PI * (1/10);
phi = 2* Math.PI / 3;
v_child = 0;

setStringParentToAngle(theta);
setStringChildToAngle(phi);
placeJoint();
//update();

//timerFunction = setInterval(updateParentPosistion(), dt * 1000);


