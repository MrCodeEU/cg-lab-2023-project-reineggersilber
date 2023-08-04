//TODO fix key inputs to the way in the todo.taks file

// stop camera animation if c is pressed
window.addEventListener("keydown", function (event) {
    if (event.key == "c") {
      cameraAnimationScene1.stop();
      cameraAnimationScene2.stop();
      cameraAnimationScene3.stop();
      timerAnimation.stop();
      freeroam = true;
      finished = true;
      camera.control.enabled = true;
    } else if (event.key == "1" && freeroam) {
      currentScene = 0;
      animationsScene3.forEach((a) => a.stop());
      animationsScene2.forEach((a) => a.stop());
      animationsScene1.forEach((a) => a.reset());
      camera.control.position = vec3.fromValues(20, 2, 5);
      camera.control.lookingDir = { x: -90, y: 0 };
    } else if (event.key == "2" && freeroam) {
      currentScene = 1;
      animationsScene1.forEach((a) => a.stop());
      animationsScene3.forEach((a) => a.stop());
      animationsScene2.forEach((a) => a.reset());
      camera.control.position = vec3.fromValues(0, 5, -15);
      camera.control.lookingDir = { x: 0, y: 0 };
    } else if (event.key == "3" && freeroam) {
      currentScene = 2;
      animationsScene1.forEach((a) => a.stop());
      animationsScene2.forEach((a) => a.stop());
      animationsScene3.forEach((a) => a.reset());
      camera.control.position = vec3.fromValues(20, 2, 5);
      camera.control.lookingDir = { x: -90, y: 0 };
    } else if (event.key == "p") {
      // print camera position and rotation
      console.log(camera.control.position);
      console.log(camera.control.lookingDir);
      console.log(currentScene);
    } else if (event.key == "r") {
      // print scene graph
      console.log(currentScene == 1 ? rootPlanet : root);
    } else if (event.key == "o" && freeroam) {
      // start animations of elements in scene
      if (currentScene == 0) {
        animationsScene1.forEach((a) => a.reset());
        animationsScene1.forEach((a) => a.start());
      } else if (currentScene == 1) {
        animationsScene2.forEach((a) => a.reset());
        animationsScene2.forEach((a) => a.start());
      } else if (currentScene == 2) {
        animationsScene3.forEach((a) => a.reset());
        animationsScene3.forEach((a) => a.start());
      }
    } else if (event.key == "b" && freeroam){
      // start animations and camera animation
      camera.control.enabled = false;
      freeroam = false;
      if (currentScene == 0) {
        animationsScene1.forEach((a) => a.reset());
        animationsScene1.forEach((a) => a.start());
        cameraAnimationScene1.reset();
        cameraAnimationScene1.start();
      } else if (currentScene == 1) {
        animationsScene2.forEach((a) => a.reset());
        animationsScene2.forEach((a) => a.start());
        cameraAnimationScene2.reset();
        cameraAnimationScene2.start();
      } else if (currentScene == 2) {
        animationsScene3.forEach((a) => a.reset());
        animationsScene3.forEach((a) => a.start());
        cameraAnimationScene3.reset();
        cameraAnimationScene3.start();
      }
    }
  });