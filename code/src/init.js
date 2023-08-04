/**
 * initializes OpenGL context, compile shader, and load buffers
 */
function init(resources) {
    //create a GL context
    gl = createContext();
  
  
    //setup camera
    cameraStartPos = vec3.fromValues(20, 2, 5);
    camera = new UserControlledCamera(gl.canvas, cameraStartPos);
    camera.control.lookingDir = { x: -90, y: 0 };
    //create your own scenegraph
    root = createSceneGraph(gl, resources);
    rootPlanet = createSceneGraph(gl, resources);

    // create person and append to root
    let personElements = createPersonElements(resources);
    person = new TransformationSGNode(
      glm.transform({ translate: [0, 0, 0] }),
      personElements
    );
    root.append(person);
    
    // create house and append to root
    let house = createHouse(resources)
    root.append(house);

    // create planet and append to rootPlanet also append person to planet
    let planet = createPlanet(resources);
   
    rootPlanet.append(planet);

    rootPlanet.append(person);
  
    // animations
    walkAnimationScene1 = walkAnimation1(person);
    walkAnimationScene2 = walkAnimation2(person);
    walkAnimationScene3 = walkAnimation3(person);
    cameraAnimationScene1 = cameraAnimation1(camera);
    cameraAnimationScene2 = cameraAnimation2(camera);
    cameraAnimationScene3 = cameraAnimation3(camera);
    // animations for scene 1
    animationsScene1.push(portalGunAnimation(personElements[4].children[1]));
    animationsScene1.push(openFridgeAnimation(house.children[9]));
    animationsScene1.push(PortalAnimation1(house.children[12]));
    animationsScene1.push(leftArmAnimation1(personElements[3]));
    animationsScene1.push(rightArmAnimation1(personElements[4]));
    animationsScene1.push(leftLegAnimation1(personElements[0]));
    animationsScene1.push(rightLegAnimation1(personElements[1]));
    animationsScene1.push(hideIceCream(personElements[3].children[1])); //only neccesary when switching scenes
    animationsScene1.push(walkAnimationScene1);
    // animations for scene 2
    animationsScene2.push(showPortalGunAnimation(personElements[4].children[1])); //only neccesary when switching scenes
    animationsScene2.push(iceCreamAnimation(personElements[3].children[1]));
    animationsScene2.push(PortalAnimation2(planet.children[5]));
    animationsScene2.push(leftArmAnimation2(personElements[3]));
    animationsScene2.push(rightArmAnimation2(personElements[4]));
    animationsScene2.push(leftLegAnimation2(personElements[0]));
    animationsScene2.push(rightLegAnimation2(personElements[1]));
    animationsScene2.push(rotateSunAnimation(planet.children[2]));
    animationsScene2.push(walkAnimationScene2);
    // animations for scene 3
    animationsScene3.push(showIceCream(personElements[3].children[1])); // only neccesary when switching scenes
    animationsScene3.push(PortalAnimation3(house.children[13]));
    animationsScene3.push(hidePortalGunAnimation(personElements[4].children[1]));
    animationsScene3.push(eatIceCreamAnimation(personElements[3].children[1]));
    animationsScene3.push(leftArmAnimation3(personElements[3]));
    animationsScene3.push(rightArmAnimation3(personElements[4]));
    animationsScene3.push(leftLegAnimation3(personElements[0]));
    animationsScene3.push(rightLegAnimation3(personElements[1]));
    animationsScene3.push(walkAnimationScene3);
    // 30 seconds "timer"
    timerAnimation = new Animation(
      new TransformationSGNode(glm.transform({ translate: [0,0,0] }), new RenderSGNode(makeSphere(1,1,1))),
      [
        { matrix: glm.transform({ translate: [0,0,0] }), duration: 30000 }, // 30 seconds to start free camera
      ]
    );
    // start animations
    animationsScene1.forEach((a) => a.start());
    cameraAnimationScene1.start();
    timerAnimation.start();
  }