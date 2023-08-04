// Import all models and textures from resources
function createPlant(resources) {
  let plant = new MaterialSGNode(
    new MyTextureNode(
      resources.housePlantTexture,
      new RenderSGNode(resources.housePlantObject)
    )
  );
  return plant;
}

function createCouche(resources) {
  let couche = new MyTextureNode(
    resources.couchTexture,
    new RenderSGNode(resources.couchObject)
  );
  return couche;
}

function createTable(resources) { // table and chair are the same model
  let table = new MyTextureNode(
    resources.tableTexture,
    new RenderSGNode(resources.tableObject)
  );
  return table;
}

function createFridge(resources) {
  let fridge = new MyTextureNode(
    resources.defaultTexture, // default looks good
    new RenderSGNode(resources.fridgeObject)
  );
  return fridge;
}
function createFridgeDoor(resources) {
  let fridgeDoor = new MyTextureNode(
    resources.defaultTexture, // default looks good
    new RenderSGNode(resources.fridgeDoorObject)
  );
  return fridgeDoor;
}

function createTV(resources) {
  let tv = new MyTextureNode(
    resources.tvTexture,
    new RenderSGNode(resources.tvObject)
  );
  return tv;
}

function createTVStand(resources) {
  let tvStand = new MyTextureNode(
    resources.tvStandTexture,
    new RenderSGNode(resources.tvStandObject)
  );
  return tvStand;
}

function createIceCream(resources) {
  let iceCream = new MyTextureNode(
    resources.iceCreamTexture,
    new RenderSGNode(resources.iceCreamObject)
  );
  return iceCream;
}

function createIceCreamCart(resources) {
  let iceCreamStand = new MyTextureNode(
    resources.iceCreamStandTexture,
    new RenderSGNode(resources.iceCreamStandObject)
  );
  return iceCreamStand;
}

function createTree(resources) {
  let tree = new MyTextureNode(
    resources.treeTexture,
    new RenderSGNode(resources.treeObject)
  );
  return tree;
}

function createPortalGun(resources) {
  let portalGun = new MyTextureNode(
    resources.portalGunTexture,
    new RenderSGNode(resources.portalGunObject)
  );
  return portalGun;
}

function createHouseWalls(resources) {
  return new MyTextureNode(
    resources.houseTexture,
    new RenderSGNode(resources.houseObject)
  );
}

//************************
// Functions for creation of Person
//************************
function createLeg(left, resources) {
  let legQuad = (makeQuad(hu / 2, 4 * hu, hu / 2));
  // set Texture coordinates for leg ( from blender )
  legQuad.texture = [
    // u, v front
    0.651791, 0.345085,
    0.651791, 0.503406,
    0.810112, 0.503406,
    0.810112, 0.345085,
    // u, v right
    0.653767, 0.329050,
    0.812088, 0.329050,
    0.812088, 0.170728,
    0.653767, 0.170728,
    // u, v top
    0.316629, 0.679598,
    0.474950, 0.679598,
    0.474950, 0.521276,
    0.316629, 0.521276,   
    // u, v left
    0.316629, 0.846191,
    0.474950, 0.846190,
    0.474950, 0.687869,
    0.316629, 0.687869,
    // u, v bottom
    0.162457, 0.670950,
    0.004136, 0.670950,
    0.004136, 0.829272,
    0.162457, 0.829272,
    // u, v back
    0.978681, 0.004136,
    0.820360, 0.004136,
    0.820360, 0.162457,
    0.978681, 0.162457,
  ]

  let leg = new MaterialSGNode([
    new TransformationSGNode(
      glm.translate(left ? hu : -hu, -hu * 4, 0),
      new MyTextureNode(
        resources.personTexture,
        new RenderSGNode(legQuad)
    )),
    createFoot(left),
  ]);

  leg.ambient = bodyAmbient;
  leg.diffuse = bodyDiffuse;
  leg.specular = bodySpecular;
  leg.shininess = 3;
  return leg;
}

function createFoot(left) {
  let foot = new MaterialSGNode(
    new TransformationSGNode(
      glm.translate(left ? hu : -hu, -8.05 * hu + hu / 4, 0.45 * hu),
      new RenderSGNode(makeQuad(hu * 0.75 , hu / 4, hu))
    )
  );
  foot.ambient = [0.09, 0.092, 0.0729, 1];
  foot.diffuse = bodyDiffuse;
  foot.specular = bodySpecular;
  foot.shininess = 1;
  return foot;
}
function createBody(resources) {
  let bodyQuad = (makeTrapezoidal(hu * 2, hu, hu, hu / 2, 3.6 * hu));
  // set Texture coordinates for body ( from blender )
  bodyQuad.texture = [
    // u, v front
    0.485198, 0.004136,
    0.645496, 0.004136,
    0.610333, 0.168245,
    0.520360, 0.168245,
    // u, v left or right
    0.476926, 0.513005,
    0.316629, 0.513005,
    0.351791, 0.348896,
    0.441764, 0.348896,
    // u, v top
    0.485198, 0.336814,
    0.485198, 0.176516,
    0.645496, 0.176516,
    0.645496, 0.336814,
    // u, v left or right
    0.316629, 0.004136,
    0.476926, 0.004136,
    0.441764, 0.168245,
    0.351791, 0.168245,
    // u, v bottom
    0.170728, 0.504358,
    0.260702, 0.504358,
    0.260702, 0.594331,
    0.170728, 0.594331,
    // u, v back
    0.476926, 0.340625,
    0.316629, 0.340625,
    0.351791, 0.176516,
    0.441764, 0.176516,
  ];
  let body = new MaterialSGNode([
    new TransformationSGNode(glm.translate(0, hu * 10, 0), [
      new MyTextureNode(
        resources.personTexture,
        new RenderSGNode(bodyQuad)),
    ]),
  ]);
  body.ambient = bodyAmbient;
  body.diffuse = bodyDiffuse;
  body.specular = bodySpecular;
  body.shininess = 3;
  return body;
}

function createArm(left, resources) {
  let armQuad = (makeQuad(hu / 2, 3 * hu, hu / 2));
  // set Texture coordinates for arm ( from blender )
  armQuad.texture = [
    // u, v front
    0.976705, 0.503406,
    0.976705, 0.345085,
    0.818383, 0.345085,
    0.818383, 0.503406,
    // u, v  left
    0.162457, 0.504358,
    0.004136, 0.504358,
    0.004136, 0.662679,
    0.162457, 0.662679,
    // u, v bottom
    0.643519, 0.678270,
    0.485198, 0.678270,
    0.485198, 0.836592,
    0.643519, 0.836592,
    // u, v right
    0.810112, 0.678270,
    0.651791, 0.678270,
    0.651791, 0.836592,
    0.810112, 0.836592,
    // u, v top
    0.485198, 0.669999,
    0.643519, 0.669999,
    0.643519, 0.511678,
    0.485198, 0.511678,
    // u, v back
    0.820360, 0.329050,
    0.978681, 0.329050,
    0.978681, 0.170728,
    0.820360, 0.170728,
  ]
  let arm = new MaterialSGNode([
    new TransformationSGNode(
      glm.transform({
        translate: [left ? hu * 2.2 : -hu * 2.2, hu * 3, 0],
      }),
      new MyTextureNode(
        resources.personTexture,
        new RenderSGNode(armQuad)
    ))
  ]);
  arm.ambient = bodyAmbient;
  arm.diffuse = bodyDiffuse;
  arm.specular = bodySpecular;
  arm.shininess = 3;
  return arm;
}

function createNeck(resources) {
  let neckQuad = makeQuad(hu / 3, hu / 2, hu / 3);
  // set Texture coordinates for neck ( from blender )
  neckQuad.texture = [
    0.976705, 0.511678,
    0.976705, 0.669999,
    0.810112, 0.669999,
    0.810112, 0.511678,
    0.653767, 0.004136,
    0.653767, 0.162457,
    0.812088, 0.162457,
    0.812088, 0.004136,
    0.162457, 0.837543,
    0.162457, 0.995864,
    0.004136, 0.995864,
    0.004136, 0.837543,
    0.818383, 0.511678,
    0.818383, 0.669999,
    0.651791, 0.669999,
    0.651791, 0.511678,
    0.976705, 0.678270,
    0.976705, 0.836592,
    0.818383, 0.836592,
    0.818383, 0.678270,
    0.643519, 0.503406,
    0.643519, 0.345085,
    0.485198, 0.503406,
    0.485198, 0.345085,
  ];
  let neck = new MaterialSGNode([
    new TransformationSGNode(glm.translate(0, hu * 14, 0),
      new MyTextureNode(
        resources.personTexture,
        new RenderSGNode(neckQuad)
      ))
  ]);
  neck.ambient = bodyAmbient;
  neck.diffuse = bodyDiffuse;
  neck.specular = bodySpecular;
  neck.shininess = 3;
  return neck;
}

function createHead(resources) {
  let head = new MaterialSGNode([
    new TransformationSGNode(glm.transform({translate: [0, hu * 15.5, 0], scale: 0.2, rotateY: -90, rotateX: 10}), [
      new MyTextureNode(  
        resources.personTexture,
        new RenderSGNode(resources.personHeadObject))
    ]),
  ]);
  head.ambient = bodyAmbient;
  head.diffuse = bodyDiffuse;
  head.specular = [0.1,0.1,0.1,1];
  head.shininess = 2;
  return head;
}