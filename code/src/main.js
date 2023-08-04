//the OpenGL context
var gl = null,
  program = null;

// constants for scene
let personHeight = 2 / 2; //rest is calculatet via the head unit see: https://en.wikipedia.org/wiki/Body_proportions#:~:text=In%20modern%20figure%20drawing%2C%20the,proportions%20of%20the%20human%20figure.  https://hpc.anatomy4sculptors.com/
let hu = personHeight / 8;
let walkAngle = 30;
let armAngle = 15;
// default values for body
let bodyAmbient = [0.79, 0.7, 0.529, 1];
let bodyDiffuse = [0.2, 0.2, 0.2, 1];
let bodySpecular = [0.1, 0.1, 0.1, 1];
let bodyShininess = 1.0;

// control video
let freeroam = false;
let finished = false;

//Camera
var camera = null;
var cameraPos = vec3.create();
var cameraCenter = vec3.create();
// camera animations
var cameraAnimationScene1 = null;
var cameraAnimationScene2 = null;
var cameraAnimationScene3 = null;

// animations for eche scene
var animationsScene1 = [];
var animationsScene2 = [];
var animationsScene3 = [];
// 30 second timer for all scenes
var timerAnimation = null;
// person refernece to animate portal gun and ice cream
let person = null;

// scenes
let currentScene = 0;

// scenegraph root node
var root = null;
var rootPlanet = null;

// time in last render step
var previousTime = 0;

function createSceneGraph(gl, resources) {
  //create scenegraph
  const root = new ShaderSGNode(createProgram(gl, resources.vs, resources.fs));

  return root;
}

/**
 * render one frame
 */
function render(timeInMilliseconds) {
  // wait 2 seconds before starting this ensures that all objects have been loaded correctly
  // and the animation runs correctly timed
  if (timeInMilliseconds < 2000) {
    previousTime = timeInMilliseconds;
    requestAnimationFrame(render);
    return;
  }
  // check for resize of browser window and adjust canvas sizes
  checkForWindowResize(gl);

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.9, 0.9, 0.9, 1.0);
  //clear the buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //enable depth test to let objects in front occluse objects further away
  gl.enable(gl.DEPTH_TEST);

  //Create projection Matrix and context for rendering.
  const context = createSGContext(gl);
  context.projectionMatrix = mat4.perspective(
    mat4.create(),
    glm.deg2rad(30),
    gl.drawingBufferWidth / gl.drawingBufferHeight,
    0.01,
    200 // increased to be able to see the whole scene on planet
  );
  context.viewMatrix = mat4.lookAt(
    mat4.create(),
    [0, 1, -10],
    [0, 0, 0],
    [0, 1, 0]
  );

  var deltaTime = timeInMilliseconds - previousTime;
  previousTime = timeInMilliseconds;

  //update animation BEFORE camera
  // depending on current scene
  if (currentScene == 0) {
    animationsScene1.forEach((a) => a.update(deltaTime));
    cameraAnimationScene1.update(deltaTime);
  } else if (currentScene == 1) {
    animationsScene2.forEach((a) => a.update(deltaTime));
    cameraAnimationScene2.update(deltaTime);
  } else if (currentScene == 2) {
    animationsScene3.forEach((a) => a.update(deltaTime));
    cameraAnimationScene3.update(deltaTime);
  }
  
  camera.update(deltaTime);
  timerAnimation.update(deltaTime); // scene independent timer

  //At the end of the automatic flight, switch to manual control
  if (!timerAnimation.running && !camera.control.enabled && !finished) {
    camera.control.enabled = true;
    freeroam = true;
    finished = true;
  }

  // change currentScene index if walkAnimationScene of current scene is finished
  // and we are not in freeroam mode  and set camera postition and look direction to make sense per scene
  // when in freeroam mode is started
  if (!finished && !freeroam) {
    if (currentScene == 0 && !walkAnimationScene1.running) {
      currentScene = 1;
      animationsScene1.forEach((a) => a.stop());
      animationsScene2.forEach((a) => a.reset());
      animationsScene2.forEach((a) => a.start());
      cameraAnimationScene2.start();
      camera.control.position = vec3.fromValues(0, 5, -15);
      camera.control.lookingDir = { x: 0, y: 0 };
    } else if (currentScene == 1 && !walkAnimationScene2.running) {
      currentScene = 2;
      animationsScene2.forEach((a) => a.stop());
      animationsScene3.forEach((a) => a.reset());
      animationsScene3.forEach((a) => a.start());
      cameraAnimationScene3.start();
      camera.control.position = vec3.fromValues(20, 2, 5);
      camera.control.lookingDir = { x: -90, y: 0 };
    } else if (currentScene == 2 && !walkAnimationScene3.running) {
      // to loop animations
      // currentScene = 0;
      // camera.control.enabled = false;
      animationsScene3.forEach((a) => a.stop());
      animationsScene1.forEach((a) => a.reset());
      animationsScene1.forEach((a) => a.start());
      camera.control.position = vec3.fromValues(20, 2, 5);
      camera.control.lookingDir = { x: -90, y: 0 };
    }
  }

  // if in freeroam mode set camera free after animation of current scene is finished
  if (!freeroam && finished) {
    if (currentScene == 0 && !walkAnimationScene1.running) {
      camera.control.enabled = true;
      freeroam = true;
    } else if (currentScene == 1 && !walkAnimationScene2.running) {
      camera.control.enabled = true;
      freeroam = true;
    } else if (currentScene == 2 && !walkAnimationScene3.running) {
      camera.control.enabled = true;
      freeroam = true;
    }
  }

  //Apply camera
  camera.render(context);

  //Render scene depending on current scene
  switch (currentScene) {
    case 0:
      root.render(context);
      break;
    case 1:
      rootPlanet.render(context);
      break;
    case 2:
      root.render(context);
      break;
  }

  //request another call as soon as possible
  requestAnimationFrame(render);
}
