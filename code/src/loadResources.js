//load the shader resources using a utility function
let resourcesGlobaDEBUGONLY;
loadResources({
    vs: "./src/shader/phong.vs.glsl",
    fs: "./src/shader/phong.fs.glsl",
    vs_single: "./src/shader/single.vs.glsl",
    fs_single: "./src/shader/single.fs.glsl",
    vs_portal: "./src/shader/portal.vs.glsl",
    fs_portal: "./src/shader/portal.fs.glsl",
    couchObject: "./src/models/objects/couch.obj",
    couchTexture: "./src/models/textures/couch.png",
    fridgeObject: "./src/models/objects/fridge_without_door.obj",
    // no fridge texture use default
    fridgeDoorObject: "./src/models/objects/fridge_door.obj",
    // no fridge door texture use default
    houseObject: "./src/models/objects/House.obj",
    houseTexture: "./src/models/textures/WallTexture.png",
    iceCreamObject: "./src/models/objects/IceCream.obj",
    iceCreamTexture: "./src/models/textures/IceCream.png",
    iceCreamStandObject: "./src/models/objects/IceCreamStand.obj",
    iceCreamStandTexture: "./src/models/textures/IceCreamCart.png",
    portalGunObject: "./src/models/objects/PortalGun.obj",
    portalGunTexture: "./src/models/textures/PortalGun.png",
    housePlantObject: "./src/models/objects/Small_potted_plants.obj",
    housePlantTexture: "./src/models/textures/Potted_plants.png",
    tableObject: "./src/models/objects/Table_with_Chairs.obj",
    tableTexture: "./src/models/textures/TableAndChairsTexture.png",
    treeObject: "./src/models/objects/Tree.obj",
    treeTexture: "./src/models/textures/Tree.png",
    tvObject: "./src/models/objects/TV.obj",
    tvTexture: "./src/models/textures/TV.jpg",
    tvStandObject: "./src/models/objects/TvStand.obj",
    tvStandTexture: "./src/models/textures/TV-Stand.jpg",
    livingRoomFloorTexture: "./src/models/textures/Floor_Living_Room.jpg",
    kitchenFloorTexture: "./src/models/textures/Floor_Kitchen.jpg",
    defaultTexture: "./src/models/textures/default.png",
    planetFloorTexture: "./src/models/textures/Planet_Floor.jpg",
    personTexture: "./src/models/textures/PersonObject.png",
    personHeadObject: "./src/models/objects/Head.obj",
  }).then(function (
    resources /*an object containing our keys with the loaded resources*/
  ) {
    init(resources);

    render(0);
  });