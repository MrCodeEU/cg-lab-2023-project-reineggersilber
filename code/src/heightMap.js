// generate a heightmap with n * m vertices and a max height.
// it also allows to scale the heightmap and to create a flat side
// to walk on
function generateHeightmap(n, m, height, flatSideLength, flatHeight, scale) {
  n = n || 1;
  m = m || 1;
  flatSideLength = flatSideLength || 0;
  flatHeight = flatHeight || 0;

  var width = n * scale;
  var depth = m * scale;

  var position = [];
  var normal = [];
  var texture = [];
  var index = [];
  // might make more sense to use gaussian distribution or something similar for a flatter apperiance
  var generator = new Math.seedrandom("heightmap");

  for (var i = 0; i <= n; i++) {
    for (var j = 0; j <= m; j++) {
      var x = (i / n - 0.5) * 2 * width;
      var z = (j / m - 0.5) * 2 * depth;
      var y = generator() * height;

      if (i <= flatSideLength) y = flatHeight; // flat side to walk on

      position.push(x, y, z);
      normal.push(0, 0, 0);
      texture.push(i / n, j / m);

      if (i < n && j < m) {
        var startIndex = i * (m + 1) + j;
        index.push(startIndex, startIndex + 1, startIndex + m + 1);
        index.push(startIndex + m + 1, startIndex + 1, startIndex + m + 2);
      }
    }
  }

  // calculate normals reference: https://math.stackexchange.com/questions/2686606/equation-of-a-plane-passing-through-3-points
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      var startIndex = i * (m + 1) + j;
      // Get the three vertices of the current cell
      var p1 = [
        position[startIndex * 3],
        position[startIndex * 3 + 1],
        position[startIndex * 3 + 2],
      ];
      var p2 = [
        position[(startIndex + 1) * 3],
        position[(startIndex + 1) * 3 + 1],
        position[(startIndex + 1) * 3 + 2],
      ];
      var p3 = [
        position[(startIndex + m + 1) * 3],
        position[(startIndex + m + 1) * 3 + 1],
        position[(startIndex + m + 1) * 3 + 2],
      ];
      // Calculate the two vectors formed by the vertices
      var v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
      var v2 = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
      // Calculate the normal vector using cross product
      var normalVector = [
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0],
      ];
      // Add the normal vector to the corresponding vertices
      for (var k = 0; k < 3; k++) {
        normal[startIndex * 3 + k] += normalVector[k];
        normal[(startIndex + 1) * 3 + k] += normalVector[k];
        normal[(startIndex + m + 1) * 3 + k] += normalVector[k];
      }
      // Define the indices for the triangles of the cell
      index.push(startIndex, startIndex + 1, startIndex + m + 1);
      index.push(startIndex + m + 1, startIndex + 1, startIndex + m + 2);
    }
  }

  // Normalize the normal vectors
  for (var i = 0; i < normal.length; i += 3) {
    var vec = [normal[i], normal[i + 1], normal[i + 2]];
    var magnitude = Math.sqrt(
      vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]
    );
    normal[i] /= magnitude;
    normal[i + 1] /= magnitude;
    normal[i + 2] /= magnitude;
  }
  
  return {
    position: position,
    normal: normal,
    texture: texture,
    index: index,
  };
}
