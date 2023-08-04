
// creates a cube with the given width, height, and depth (missing texture coordinates, have to be set per object)
function makeQuad(width, height, depth) {
    width = width || 1;
    height = height || 1;
    depth = depth || 1;

    var position = [
      width, height, depth,  -width, height, depth,  -width,-height, depth,   width,-height, depth, // front
      width, height, depth,   width,-height, depth,   width,-height,-depth,   width, height,-depth, // right
      width, height, depth,   width, height,-depth,  -width, height,-depth,  -width, height, depth, // top
     -width, height, depth,  -width, height,-depth,  -width,-height,-depth,  -width,-height, depth, // left
     -width,-height,-depth,   width,-height,-depth,   width,-height, depth,  -width,-height, depth, // bottom
      width,-height,-depth,  -width,-height,-depth,  -width, height,-depth,   width, height,-depth  // back
    ];

    var normal = [
      0,0,1 , 0,0,1, 0,0,1, 0,0,1, //front
      1,0,0, 1,0,0, 1,0,0, 1,0,0, //right
      0,1,0, 0,1,0, 0,1,0, 0,1,0, //top
      -1,0,0, -1,0,0, -1,0,0, -1,0,0, // left
      0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, //bottom
      0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, //back
    ];

    var texture = [0, 0 /**/, 1, 0 /**/, 1, 1 /**/, 0, 1]; 
  
    var index = [
      0, 1, 2,   0, 2, 3,  // front
      4, 5, 6,   4, 6, 7,  // right
      8, 9, 10,  8, 10,11, // top
      12,13,14,  12,14,15, // left
      16,17,18,  16,18,19, // bottom
      20,21,22,  20,22,23  // back
    ];
  
    return {
      position: position,
      normal: normal,
      texture: texture,
      index: index,
    };
  }
  
  // creates a Trapazoidal (basicliy cube with different width and depth on top and bottom) (missing texture coordinates, have to be set per object)
  function makeTrapezoidal(topWidth, bottomWidth, topDepth, bottomDepth, height) {
    topWidth = topWidth || 1;
    height = height || 1;
    topDepth = topDepth || 1;
    bottomWidth = bottomWidth || 1;
    bottomDepth = bottomDepth || 1;

    var position = [
      topWidth, height, topDepth,  -topWidth, height, topDepth,  -bottomWidth,-height, bottomDepth,   bottomWidth,-height, bottomDepth, // front
      topWidth, height, topDepth,   bottomWidth,-height, bottomDepth,   bottomWidth,-height,-bottomDepth,   topWidth, height,-topDepth, // left
      topWidth, height, topDepth,   topWidth, height,-topDepth,  -topWidth, height,-topDepth,  -topWidth, height, topDepth, // top
      -topWidth, height, topDepth,  -topWidth, height,-topDepth,  -bottomWidth,-height,-bottomDepth,  -bottomWidth,-height, bottomDepth, // right
      -bottomWidth,-height,-bottomDepth,   bottomWidth,-height,-bottomDepth,   bottomWidth,-height, bottomDepth,  -bottomWidth,-height, bottomDepth, // bottom
      topWidth, height,-topDepth,  -topWidth, height,-topDepth,  -bottomWidth,-height,-bottomDepth,   bottomWidth,-height,-bottomDepth  // back
    ];

    var normal = [
      0,0,1 , 0,0,1, 0,0,1, 0,0,1, //front
      1,0,0, 1,0,0, 1,0,0, 1,0,0, //left
      0,1,0, 0,1,0, 0,1,0, 0,1,0, //top
      -1,0,0, -1,0,0, -1,0,0, -1,0,0, // right
      0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, // bottom
      0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, //back
    ];

    var texture = [0, 0 /**/, 1, 0 /**/, 1, 1 /**/, 0, 1]; 
  
    var index = [
      0, 1, 2,   0, 2, 3,  // front
      4, 5, 6,   4, 6, 7,  // left
      8, 9, 10,  8, 10,11, // top
      12,13,14,  12,14,15, // right
      16,17,18,  16,18,19, // bottom
      20,21,22,  20,22,23  // back
    ];
  
    return {
      position: position,
      normal: normal,
      texture: texture,
      index: index,
    };
  }

  // creates a plane with the given width and height and adds a texture if specified
  function createFloor(width, height, image) {
    width = width || 1;
    height = height || 1;
    image = image || null;
    let floor;
    if (image != null) {
      floor = new MyTextureNode(image, new RenderSGNode(makeRect(width, height)));
    } else {
      floor = new MaterialSGNode([new RenderSGNode(makeRect(width, height))]);
    }
    //light grey
    floor.ambient = [0.9, 0.9, 0.9, 1];
    floor.diffuse = [0.1, 0.1, 0.1, 1];
    floor.specular = [0.5, 0.5, 0.5, 1];
    floor.shininess = 1;
    return floor;
  }

  // creates a light with a white color
  function createLightHouse(resources) {
    let light = new LightSGNode();
    light.ambient = [0.2, 0.2, 0.2, 1];
    light.diffuse = [1, 1, 1, 1];
    light.specular = [0.1, 0.1, 0.1, 1];
    light.position = [0, 0, 0];
    light.append(
      new TransformationSGNode(
        glm.transform({ translate: [0, 0, 0] }),
        new ShaderSGNode(
          createProgram(gl, resources.vs_single, resources.fs_single),
          new RenderSGNode(makeSphere(0.1, 10, 10))
        )
      )
    );
    return light;
  }

  // creates a light source as "sun"
  function createLightPlanet() {
    let light = new LightSGNode();
    light.ambient = [1, 0.4, 0.7, 1];
    light.diffuse = [1, 0.2, 0.5, 1];
    light.specular = [1, 1, 1, 1];
    light.position = [0, 0, 0];
    light.uniform = 'u_light2';
    light.append(
      new TransformationSGNode(
        glm.transform({ translate: [0, 0, 0] }),
        new RenderSGNode(makeSphere(0.1, 10, 10))
      )
    );
    return light;
  }

  // spot light for the tv with a blueish color
  function createLightTV() {
    let light = new SpotLightNode();
    light.ambient = [0.2, 0.2, 0.3, 1];
    light.diffuse = [0.1, 0.1, 1, 1];
    light.specular = [1, 1, 1, 1];
    light.position = [0, 0, 0];
    light.direction = [0, 0, 1];
    light.angle = 1;
    light.uniform = 'u_spotLight2';
    light.append(
      new TransformationSGNode(
        glm.transform({ translate: [0, 0, 0] }),
        new RenderSGNode(makeSphere(0.1, 10, 10))
      )
    );
    return light;
  }

  // creates a spot light with a greenish color
  function createPortalGunLight() {
    let light = new SpotLightNode();
    light.ambient = [0.02, 0.03, 0.02, 1];
    light.diffuse = [0.1, 1, 0.1, 1];
    light.specular = [1, 1, 1, 1];
    light.position = [0, 0, 0];
    light.direction = [0, 0, 1];
    light.angle = 0.2;
    light.uniform = 'u_spotLight';
    light.append(
      new TransformationSGNode(
        glm.transform({ translate: [0, 0, 0] }),
        new RenderSGNode(makeSphere(1, 10, 10))
      )
    );
    return light;
  }