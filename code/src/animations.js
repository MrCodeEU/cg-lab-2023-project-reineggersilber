let moveToFloor = [0, 8*hu, 0];
let moveToShoulder = [0, 13*hu, 0];
let walkanimationSpeed = 0.5;

/*
  Camera MyAnimations
*/
function cameraAnimation1(camera){
    return new MyAnimation(
        camera,
        [
          { matrix: glm.transform({ translate: [2, 1, 5], rotateY: 180 }), duration: 0 }, // start at tv	
          { matrix: glm.transform({ translate: [2, 1, 5], rotateY: 180 }), duration: 1500 }, // start keep lookig at tv
          { matrix: (progress) => glm.transform({ translate: [2 + 18*progress, 1 + progress, 5], rotateY: -180 + 90 * progress }), duration: 1500 },  // move back from tv
          { matrix: glm.transform({ translate: [20, 2, 5], rotateY: -90 }), duration: 1000 }, // stay and wait for stand up
          { matrix: glm.transform({ translate: [20, 2, -5], rotateY: -90 }), duration: 6000 }, // move to kitchen
          { matrix: glm.transform({ translate: [15, 2, -5], rotateY: -95 }), duration: 2000 }, // move a bit closer to fridge
          { matrix: glm.transform({ translate: [15, 2, -5], rotateY: -85 }), duration: 3000 }, //wait for walk through portal and look at portal
        ]
      );
}

function cameraAnimation2(camera){
  return new MyAnimation(
      camera,
      [
        { matrix: glm.transform({ translate: [0, 25, -50], rotateX: 25}), duration: 0 }, //move to 0,0 "on planet"
        { matrix: glm.transform({ translate: [0, 20, -30], rotateX: 25}), duration: 7000 }, // follow person on planet
        { matrix: glm.transform({ translate: [0, 2, 20], rotateX: 10}), duration: 5000 }, // follow through portal?
      ]
    );
}


function cameraAnimation3(camera){
  return new MyAnimation(
      camera,
      [
        { matrix: glm.transform({ translate: [15, 3, 7], rotateY: -90}), duration: 0 }, // start a litle above portal
        { matrix: glm.transform({ translate: [20, 2, 5], rotateY: -90 }), duration: 3000 }, // move out again
      ]
    );
}

/*
  Portal Gun and Ice Cream MyAnimations
*/
function portalGunAnimation(portalGun){
  return new MyAnimation(
    portalGun,
    [
      { matrix: glm.transform({ translate: [-0.25, 25.5*hu , -0.05], rotateX: -90, scale: 0.08 }), duration: 0 }, // start with not visible portal gun
      { matrix: glm.transform({ translate: [-0.25, 25.5*hu , -0.05], rotateX: -90, scale: 0.08 }), duration: 10000 }, // wait 11 seconds
      { matrix: glm.transform({ translate: [-0.25, 5.5*hu , -0.05], rotateX: -90, scale: 0.08 }), duration: 1000 }, // go to hand
    ], false
  );
}

function hidePortalGunAnimation(portalGun){
  return new MyAnimation(
    portalGun,
    [
      { matrix: glm.transform({ translate: [-0.25, 5.5*hu , -0.05], rotateX: 180, scale: 0.08 }), duration: 0 }, // start with not visible portal gun
      { matrix: glm.transform({ translate: [-0.25, 5.5*hu , 20], rotateX: 180, scale: 0.008 }), duration: 2000 }, // does not work without this
    ], false
  );
}

function showPortalGunAnimation(portalGun){
  return new MyAnimation(
    portalGun,
    [
      { matrix: glm.transform({ translate: [-0.25, 5.5*hu , -0.05], rotateX: -90, scale: 0.08 }), duration: 0 }, // start with not visible portal gun
      { matrix: glm.transform({translate: [-0.25, 5.5*hu , -0.05], rotateX: -90, scale: 0.08 }), duration: 500 }, // does not work without this
    ], false
  );
}

function iceCreamAnimation(iceCream){
  return new MyAnimation(
    iceCream,
    [
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.01 }), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.01 }), duration: 5000 }, // wait 10 second
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.15 }), duration: 500 }, // show ice
    ]
  );
}
function hideIceCream(iceCream){
  return new MyAnimation(
    iceCream,
    [
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.01 }), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.01 }), duration: 100 }, // wait 15 seconds
    ]
  );
}
function showIceCream(iceCream){
  return new MyAnimation(
    iceCream,
    [
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.15 }), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.15 }), duration: 100 }, // wait 15 seconds
    ]
  );
}
function eatIceCreamAnimation(iceCream){
  return new MyAnimation(
    iceCream,
    [
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.15 }), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.15 }), duration: 1500 }, // wait 5 second
      { matrix: glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.01 }), duration: 100 }, // hide ice
    ]
  );
}
// open fridge
function openFridgeAnimation(fridge){
  return new MyAnimation(
    fridge,
    [
      { matrix: glm.transform({ translate: [0.5, 0, -7], rotateY: -125, scale: [0.5,0.5,0.7] }), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [0.5, 0, -7], rotateY: -125, scale: [0.5,0.5,0.7] }), duration: 9000 }, // wait 10 second
      { matrix: glm.transform({ translate: [0.5, 0, -7], rotateY: -40, scale: [0.5,0.5,0.7] }), duration: 1000 }, // open fridge
      { matrix: glm.transform({ translate: [0.5, 0, -7], rotateY: -40, scale: [0.5,0.5,0.7] }), duration: 2000 }, // wait 2 second
      { matrix: glm.transform({ translate: [0.5, 0, -7], rotateY: -125, scale: [0.5,0.5,0.7] }), duration: 1000 }, // close fridge
    ]
  );
}
// rotate sun on planet. 4 rotations in scene 2
function rotateSunAnimation(sun){
  return new MyAnimation(
    sun,
    [
      { matrix: (progress) => glm.transform({ translate: [0, 50*Math.cos(progress * 2* Math.PI), 50*Math.sin(progress * 2* Math.PI)] }), duration: 4000 }, // rotate 360 degrees
      { matrix: (progress) => glm.transform({ translate: [0, 50*Math.cos(progress * 2* Math.PI), 50*Math.sin(progress * 2* Math.PI)] }), duration: 4000 }, // rotate 360 degrees
      { matrix: (progress) => glm.transform({ translate: [0, 50*Math.cos(progress * 2* Math.PI), 50*Math.sin(progress * 2* Math.PI)] }), duration: 4000 }, // rotate 360 degrees
    ]
  );
}

/*
  Portal MyAnimations
*/
// scene 1
function PortalAnimation1(portal){
  return new MyAnimation(
    portal,
    [
      { matrix: glm.transform({ translate: [-6, 1.5, -5], rotateY: -90 , scale: 0.01 }), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [-6, 1.5, -5], rotateY: -90 , scale: 0.01 }), duration: 13000 }, // wait 10 second
      { matrix: glm.transform({ translate: [-6, 1.5, -5], rotateY: -90 , scale: 1 }), duration: 1000 }, // scale up
    ]
  );
}
// scene 2
function PortalAnimation2(portal){
  return new MyAnimation(
    portal,
    [
      { matrix: glm.transform({ translate: [0, -5, 22], scale: 0.01 }), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [0, -5, 22], scale: 0.01 }), duration: 9900 }, // wait 9 second
      { matrix: glm.transform({ translate: [0, 1.5, 22], scale: 0.01 }), duration: 100 }, // wait move into position second
      { matrix: glm.transform({ translate: [0, 1.5, 22], scale: 1 }), duration: 1000 }, // scale up
    ]
  );
}
// scene 3
function PortalAnimation3(portal){
  return new MyAnimation(
    portal,
    [
      { matrix: glm.transform({ translate: [1.5, 5.9, 7], rotateX: -90, scale: 0.01 }), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [1.5, 5.9, 7], rotateX: -90, scale: 0.01 }), duration: 100 }, // wait 0.1 second
      { matrix: glm.transform({ translate: [1.5, 5.9, 7], rotateX: -90, scale: 1 }), duration: 100 }, // scale up
      { matrix: glm.transform({ translate: [1.5, 5.9, 7], rotateX: -90, scale: 1 }), duration: 1000 }, // stay open
      { matrix: glm.transform({ translate: [1.5, 5.9, 7], rotateX: -90, scale: 0.001 }), duration: 300 }, // close 
      { matrix: glm.transform({ translate: [1.5, 8, 7], rotateX: -90, scale: 0.001 }), duration: 100 }, // close 
    ]
  );
}


/*
    Person extremities MyAnimations
*/
//left arm
function leftArmAnimation1(leftArm){
  return new MyAnimation(
    leftArm,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: -6}), duration: 0, }, // start position
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: -6}), duration: 4500, }, // wait
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) + 180 , rotateZ: -6}), duration: 688, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss +180) , rotateZ: -6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) +180 , rotateZ: -6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss) + 180 , rotateZ: -6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) + 180 , rotateZ: -6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss +180) , rotateZ: -6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) +180 , rotateZ: -6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss) + 180 , rotateZ: -6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: -6}), duration: 3000, }, // wait
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) + 180 , rotateZ: -6}), duration: 500, },// 2000 total walk / 4 "steps" = 500
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss +180) , rotateZ: -6}), duration: 500, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) +180 , rotateZ: -6}), duration: 500, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss) + 180 , rotateZ: -6}), duration: 500, },
    ]
  );
}
function leftArmAnimation2(leftArm){
  return new MyAnimation(
    leftArm,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) + 180 , rotateZ: -6}), duration: 560, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss +180) , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) +180 , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss) + 180 , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) + 180 , rotateZ: -6}), duration: 560, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss +180) , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) +180 , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss) + 180 , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) + 180 , rotateZ: -6}), duration: 560, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss +180) , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) +180 , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss) + 180 , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) + 180 , rotateZ: -6}), duration: 560, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss +180) , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) +180 , rotateZ: -6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss) + 180 , rotateZ: -6}), duration: 560, },
    ]
  );
}
function leftArmAnimation3(leftArm){
  return new MyAnimation(
    leftArm,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 200 , rotateZ: -6}), duration: 0, }, // start position
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 200 , rotateZ: -6}), duration: 1000, }, // wait
      { matrix: (progrss) => glm.transform({ translate: [0, 9*hu, 0], rotateX: 200 -180 *progrss , rotateZ: 6}), duration: 500, }, // put ice to mouth 
      { matrix: (progrss) => glm.transform({ translate: [0, 9*hu, 0], rotateX: 20 , rotateZ: 6}), duration: 1000, }, // eat ice
      { matrix: (progrss) => glm.transform({ translate: [0, 9*hu, 0], rotateX: 20 + 160 * progrss , rotateZ: -6}), duration: 500, }, // lower arm
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: -6}), duration: 0, }, // fix arm position
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: -6}), duration: 100, }, // fix arm position
    ]
  );
}
//right arm
function rightArmAnimation1(rightArm){
  return new MyAnimation(
    rightArm,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: 6}), duration: 0, }, // start position
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: 6}), duration: 4500, }, // wait
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) + 180 , rotateZ: 6}), duration: 688, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss +180) , rotateZ: 6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) +180 , rotateZ: 6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss) + 180 , rotateZ: 6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) + 180 , rotateZ: 6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss +180) , rotateZ: 6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) +180 , rotateZ: 6}), duration: 688, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss) + 180 , rotateZ: 6}), duration: 688, }, 
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 - 90 * progrss , rotateZ: 6}), duration: 500, }, // lift arm into fridge
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 90 , rotateZ: 6}), duration: 500, }, // wait
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 90 + 90  * progrss , rotateZ: 6}), duration: 500, }, // take arm out of fridge
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: 6}), duration: 500, }, // wait
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 - 90  * progrss , rotateZ: 6}), duration: 500, }, // shoot portal
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 90 - 20 * progrss , rotateZ: 6}), duration: 500, }, // shoot portal gun
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 70 + 110 * progrss , rotateZ: 6}), duration: 500, }, // shoot portal gun
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) + 180 , rotateZ: 6}), duration: 500, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss +180) , rotateZ: 6}), duration: 500, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) +180 , rotateZ: 6}), duration: 500, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss) + 180 , rotateZ: 6}), duration: 500, }, 
    ]
  );
}
function rightArmAnimation2(rightArm){
  return new MyAnimation(
    rightArm,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) + 180 , rotateZ: 6}), duration: 560, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss +180) , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) +180 , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss) + 180 , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) + 180 , rotateZ: 6}), duration: 560, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss +180) , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) +180 , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss) + 180 , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) + 180 , rotateZ: 6}), duration: 560, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss +180) , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) +180 , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss) + 180 , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle * progrss) + 180 , rotateZ: 6}), duration: 560, }, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (armAngle - armAngle * progrss +180) , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle * progrss) +180 , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: (-armAngle + armAngle * progrss) + 180 , rotateZ: 6}), duration: 560, },
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 - 90  * progrss , rotateZ: 6}), duration: 500, }, // shoot portal
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 90 - 20 * progrss , rotateZ: 6}), duration: 500, }, // shoot portal gun
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 70 + 110 * progrss , rotateZ: 6}), duration: 500, }, // shoot portal gun
    ]
  );
}
function rightArmAnimation3(rightArm){
  return new MyAnimation(
    rightArm,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: 6}), duration: 0, }, // start position
      { matrix: (progrss) => glm.transform({ translate: moveToShoulder, rotateX: 180 , rotateZ: 6}), duration: 3000, }, // keep position
    ]
  );
}
//left leg
function leftLegAnimation1(leftLeg){
  return new MyAnimation(
    leftLeg,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -90 }), duration: 0 }, // initial position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -90 }), duration: 4000 }, // keep position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -90 + 90* progrss }), duration: 500 }, // keep position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 688}, // 5500 seconds total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor }), duration: 3000 }, // keep position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 500},  // 2000 total walk / 4 "steps" = 500
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 500},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 500},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 500},
    ]
  );
}
function leftLegAnimation2(leftLeg){
  return new MyAnimation(
    leftLeg,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 560}, // 9000 seconds total walk / 16 "steps" = 560
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 560}, // 9000 seconds total walk / 16 "steps" = 560
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 560}, // 9000 seconds total walk / 16 "steps" = 560
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 560}, // 9000 seconds total walk / 16 "steps" = 560
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 560},
    ]
  );
}
function leftLegAnimation3(leftLeg){
  return new MyAnimation(
    leftLeg,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: 0 }), duration: 0 }, // initial position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -90 * progrss }), duration: 100 }, // sit position
    ]
  );
}
//right leg
function rightLegAnimation1(rightLeg){
  return new MyAnimation(
    rightLeg,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -90 }), duration: 0 }, // initial position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -90 }), duration: 4000 }, // keep position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -90 + 90* progrss }), duration: 500 }, // keep position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 688}, // 5500 total walk / 8 "steps" = 688
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 688},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor }), duration: 3000 }, // keep position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 500}, // 2000 total walk / 4 "steps" = 500
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 500},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 500},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 500},
    ]
  );
}
function rightLegAnimation2(rightLeg){
  return new MyAnimation(
    rightLeg,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 560}, // 9000 seconds total walk / 16 "steps" = 560
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 560}, // 9000 seconds total walk / 16 "steps" = 560
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 560}, // 9000 seconds total walk / 16 "steps" = 560
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle * progrss }), duration: 560}, // 9000 seconds total walk / 16 "steps" = 560
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -walkAngle + walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle * progrss }), duration: 560},
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: walkAngle - walkAngle * progrss }), duration: 560},
    ]
  );
}
function rightLegAnimation3(rightLeg){
  return new MyAnimation(
    rightLeg,
    [
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: 0 }), duration: 0 }, // initial position
      { matrix: (progrss) => glm.transform({ translate: moveToFloor, rotateX: -90 * progrss }), duration: 100 }, // sit position
    ]
  );
}

/*
  Person walking MyAnimations
*/
// Scene 1
function walkAnimation1(person){
  return new MyAnimation(
      person,
      [
        { matrix: glm.transform({ translate: [2, -0.4, 7], rotateY: -180 }), duration: 0 }, // start position
        { matrix: glm.transform({ translate: [2, -0.4, 7], rotateY: 180 }), duration: 4000 }, // start position
        { matrix: glm.transform({ translate: [2, 0, 6], rotateY: 180 }), duration: 500 }, // stand up
        { matrix: glm.transform({ translate: [2, 0, 6], rotateY: 180+31.5}), duration: 0 }, // look at walk direction
        { matrix: glm.transform({ translate: [-3, 0, 0], rotateY: 180+31.5}), duration: 2500 }, // walk to door
        { matrix: glm.transform({ translate: [-3, 0, 0], rotateY: 180-2*31.5}), duration: 0 }, // look at walk direction
        { matrix: glm.transform({ translate: [0, 0, -6], rotateY: 180-2*31.5 }), duration: 3000 }, // walk to fridge
        { matrix: glm.transform({ translate: [0, 0, -6], rotateY: 180 }), duration: 0 }, // look at fridge
        { matrix: glm.transform({ translate: [0, 0, -6], rotateY: 180 }), duration: 2000 }, // wait while looking at fridge
        { matrix: glm.transform({ translate: [0, 0, -6], rotateY: 180+3*31.5 }), duration: 0 }, // look at portal
        { matrix: glm.transform({ translate: [0, 0, -6], rotateY: 180+3*31.5 }), duration: 1000 }, // wait for  portal
        { matrix: glm.transform({ translate: [-4, 0, -5], rotateY: 180+3*31.5 }), duration: 2000 }, // walk to portal
      ], false
    );
}

// Scene 2
function walkAnimation2(person){
return new MyAnimation(
    person,
    [
      { matrix: glm.transform({ translate: [0, 0, 0] }), duration: 0 }, // walk to icecream
      { matrix: glm.transform({ translate: [0, 0, 20] }), duration: 9000 }, // walk to portal
      { matrix: glm.transform({ translate: [0, 0, 20] }), duration: 2000 }, // wait for portal
      { matrix: glm.transform({ translate: [0, 0, 22] }), duration: 1000 }, // walk to portal
    ], false
  );
}

//scene 3
function walkAnimation3(person){
return new MyAnimation(
    person,
    [
      { matrix: glm.transform({ translate: [2, 8, 7] , rotateY: -180, scale: 0.01}), duration: 0 }, // start position
      { matrix: glm.transform({ translate: [2, -0.4, 7], rotateY: -180, scale: 1 }), duration: 1000 }, // fall on couch in sit position
      { matrix: glm.transform({ translate: [2, -0.4, 7], rotateY: -180, scale: 1 }), duration: 2000 }, // wait
    ], false
  );
}
