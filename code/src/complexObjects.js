// creates a ceiling lamp with the white light source
function createLamp(resources) {
  let lamp = new SGNode();
  lamp.append(createLightHouse(resources));
  let lightfixture = new MaterialSGNode([
    new TransformationSGNode(
      glm.transform({ translate: [0, 0.25, 0] }),
      new RenderSGNode(makeTrapezoidal(0.1, 0.2, 0.1, 0.2, 0.2))
    ),
    new TransformationSGNode(
      glm.transform({ translate: [0, 0.75, 0] }),
      new RenderSGNode(makeQuad(0.05, 0.3, 0.05))
    ),
  ]);
  lightfixture.ambient = [0.5, 0.52, 0.729, 1];
  lightfixture.diffuse = [0.1, 0.1, 0.1, 1];
  lightfixture.specular = [0.5, 0.5, 0.5, 1];
  lightfixture.shininess = 1;
  lamp.append(lightfixture);
  return lamp;
}

// creates the composed object of a person
// the person is composed of several parts
// the head, the neck, the body, the arms and the legs
// it also has the elements ice cream and portal gun
// those two get animated to appear and disaper in scene
// probabl would make more sense to have them as seperate objects
// and remove and add them to the scene graph on a timer basis
// but this works and is easier to implement
function createPersonElements(resources) {
  // construct Person
  let leftLeg = new TransformationSGNode(
    glm.transform({ translate: [0, 0, 0] }),
    createLeg(true, resources)
  );

  let rightLeg = new TransformationSGNode(
    glm.transform({ translate: [0, 0, 0] }),
    createLeg(false, resources)
  );

  let body = new TransformationSGNode(
    glm.transform({ translate: [0, 0, 0] }),
    createBody(resources)
  );
  let leftArm = new TransformationSGNode(
    glm.transform({ translate: [0, 0, 0] }),
    createArm(true, resources)
  );

  let rightArm = new TransformationSGNode(
    glm.transform({ translate: [0, 0, 0] }),
    createArm(false, resources)
  );

  let neck = new TransformationSGNode(
    glm.transform({ translate: [0, 0, 0] }),
    createNeck(resources)
  );
  let head = new TransformationSGNode(
    glm.transform({ translate: [0, 0, 0] }),
    createHead(resources)
  );
  let iceCream = new TransformationSGNode(
    glm.transform({ translate: [.3, 6*hu , 0], rotateX: -150, scale: 0.15 }),
    createIceCream(resources)
  );
  let portalGun = new TransformationSGNode(
    glm.transform({ translate: [-.25, 5.5*hu , -.05], rotateX: 90, scale: 0.08 }),
    [createPortalGun(resources), createPortalGunLight()]
  );
  rightArm.append(portalGun);
  leftArm.append(iceCream);
  return [leftLeg, rightLeg, body, leftArm, rightArm, neck, head];
}

// creates a Portal using the simple shader
// this gives it a unnatural look beause of the 
// missing phong shading
function createPortal(resources) {
  let portal = new SGNode();
  let portalFrame = new ShaderSGNode(
    createProgram(gl, resources.vs_portal, resources.fs_portal),
    createPortalFrame(1.5)
  );
  portal.append(portalFrame);
  return portal;
}

// portal frame uses toe sphere function to create a sphere
// that is only 1 vertex thick
function createPortalFrame(height){
  let portal = new MaterialSGNode(
      new TransformationSGNode(glm.scale(0.5,1,1), 
          new RenderSGNode(makeSphere(height, 20, 2))
      ));
  return portal;
}

// randomizes the position of the trees in a 
// straight line to get one side of an ell 
function createForrest(resources) {
  let forrest = new SGNode();
  // randomize tree positions
  let treePositions = [];
  let treeRotations = [];
  let generator = new Math.seedrandom("treePositions");
  // randomize tree positions in one line
  for (let i = 0; i < 20; i++) {
    treePositions.push([
      0,
      0,
      generator() * 60 + 10,
    ]);
    treeRotations.push(generator() * 360);
  }
  // create trees
  let trees = [];
  for (let i = 0; i < 20; i++) {
    trees.push(
      new TransformationSGNode(
        glm.transform({ translate: treePositions[i], rotateY: treeRotations[i], scale: [0.35,0.45,0.35] }),
        createTree(resources)
      )
    );
  }
  // add trees to forrest
  for (let i = 0; i < 20; i++) {
    forrest.append(trees[i]);
  }
  return forrest;
}

// creates a planet with 3 heightmaps as mountains in a valley
// it also contains the Portals, the trees amd the ice cream stand
function createPlanet(resources) {
  let planet = new SGNode();
 

  let floor1 = new TransformationSGNode(
    glm.transform({ translate: [-20, 0, 0], rotateY: 180 }),
    new MyTextureNode(resources.planetFloorTexture, new RenderSGNode(generateHeightmap(10,50,15,2,0,2)))
  );
  let floor2 = new TransformationSGNode(
    glm.transform({ translate: [20, 0, 0]  }),
    new MyTextureNode(resources.planetFloorTexture, new RenderSGNode(generateHeightmap(10,50,15,2,0,2)))
  );
  let floor3 = new TransformationSGNode(
    glm.transform({ translate: [0, -0.1, 100], rotateY: -90  }),
    new MyTextureNode(resources.planetFloorTexture, new RenderSGNode(generateHeightmap(10,50,15,2,0,4)))
  );
  // add "sun"
  let sun = new TransformationSGNode(
    glm.transform({ translate: [0, 50, 0] }),
    createLightPlanet()
  );
  // add ice cream stand
  let iceCreamStand = new TransformationSGNode(
    glm.transform({ translate: [0, 0.15, 10], rotateY: -90 , scale: 0.25}),
    createIceCreamCart(resources)
  );
  // add forrest
  let forrest1 = new TransformationSGNode(
    glm.transform({ translate: [-3, 0, -20] }),
    createForrest(resources)
  );
  let forrest2 = new TransformationSGNode(
    glm.transform({ translate: [3, 0, -20] }),
    createForrest(resources)
  );

  // add portal 1 and 2
  let portal1 = new TransformationSGNode(
    glm.transform({ translate: [0, 1.5, 0] }),
    createPortal(resources)
  );
  let portal2 = new TransformationSGNode(
    glm.transform({ translate: [0, 1.5, 22] }),
    createPortal(resources)
  );

  planet.append(floor1);
  planet.append(floor2);
  planet.append(sun);
  planet.append(iceCreamStand);
  planet.append(forrest1);
  planet.append(portal2);
  planet.append(forrest2);
  planet.append(portal1);
  planet.append(floor3);
  return planet;
}

// creates a House containing a living room and a kitchen
// the living room contains a TV, a couch and 2 plants
// the kitchen contains a fridge, a table with chairs and a lamp
// it also contains two portals that get animated later
function createHouse(resources) {
  let house = new SGNode();

  //floor
  let livingRoomFloor = new TransformationSGNode(
    glm.transform({ translate: [5, 0, 5], rotateX: -90 }),
    createFloor(15,5,resources.livingRoomFloorTexture)
  );

  let kitchenRoomFloor = new TransformationSGNode(
    glm.transform({ translate: [5, 0, -5], rotateX: -90 }),
    createFloor(15,5,resources.kitchenFloorTexture)
  );

  // walls / house
  let houseWalls = new TransformationSGNode(
    glm.transform({ translate: [-7, 0, 0] , scale: [2.5,1,0.5]}),
    createHouseWalls(resources)
  );

  // lights replace with spotlights
  let lampKitchen = new TransformationSGNode(
    glm.transform({ translate: [0, 5, -5], scale: 1.5 }),
    createLamp(resources, [0, 3, 0])
  );

  // plants
  let plant1 = new TransformationSGNode(
    glm.transform({ translate: [-5, 0, 7], rotateY: 90, scale: [0.035,0.055,0.035] }),
    createPlant(resources)
  );
  let plant2 = new TransformationSGNode(
    glm.transform({ translate: [-5, 0, 1], rotateY: 90, scale: 0.035 }),
    createPlant(resources)
  );

  // couche
  let couche = new TransformationSGNode(
    glm.transform({ translate: [2, 0, 7], rotateY: 180, scale: 1.25 }),
    createCouche(resources)
  );
  // add table
  let table = new TransformationSGNode(
    glm.transform({ translate: [4, 1.25, -2], rotateY: 180, scale: 0.35 }),
    createTable(resources)
  );
  // add chair x4 in table object
  // add fridge
  let fridge = new TransformationSGNode(
    glm.transform({ translate: [0, 0, -7.5], rotateY: -90, scale: [0.5,0.5,0.7] }),
    createFridge(resources)
  );
  let fridgeDoor = new TransformationSGNode(
    glm.transform({ translate: [0.5, 0, -7], rotateY: -125, scale: [0.5,0.5,0.7] }),
    createFridgeDoor(resources)
  );
  // add tv
  let tv = new TransformationSGNode(
    glm.transform({ translate: [0, -1.7, 0], scale: 1.5 }),
    createTV(resources)
  );
  let tvLight = new TransformationSGNode(
    glm.transform({ translate: [2, 1.7, 1] }),
    createLightTV()
  );
  tvLight.append(tv);
  let tvStand = new TransformationSGNode(
    glm.transform({ translate: [2, 0, 1], scale: 1.5 }),
    createTVStand(resources)
  );
  // add portal 1 and 2
  let portal1 = new TransformationSGNode(
    glm.transform({ translate: [-6, 1.5, -5], rotateY: -90 }),
    createPortal(resources)
  );
  let portal2 = new TransformationSGNode(
    glm.transform({ translate: [1.5, 5, 7], rotateX: -90, scale: 0.01 }),
    createPortal(resources)
  );
  // Optional TODO add kitchen appliances

  // add to house
  house.append(livingRoomFloor);
  house.append(kitchenRoomFloor);
  house.append(houseWalls);
  house.append(lampKitchen);
  house.append(plant1);
  house.append(plant2);
  house.append(couche);
  house.append(table);
  house.append(fridge);
  house.append(fridgeDoor);
  house.append(tvLight);
  house.append(tvStand);
  house.append(portal1);
  house.append(portal2);
  return house;
}
