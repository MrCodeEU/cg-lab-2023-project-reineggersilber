class MyTextureNode extends AdvancedTextureSGNode {
  init(gl) {
    this.textureId = gl.createTexture();
    //select a texture unit
    gl.activeTexture(gl.TEXTURE0);

    // flip the image's y axis
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    gl.bindTexture(gl.TEXTURE_2D, this.textureId);

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MAG_FILTER,
      this.magFilter || gl.LINEAR
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      this.minFilter || gl.LINEAR
    );

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS || gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT || gl.REPEAT);

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.image
    );

    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  render(context) {
    if (this.textureId < 0) {
      this.init(context.gl);
    }

    //tell shader to use texture
    gl.uniform1i(
      gl.getUniformLocation(context.shader, "u_enableObjectTexture"),
      1
    );

    //set additional shader parameters
    gl.uniform1i(
      gl.getUniformLocation(context.shader, this.uniform),
      this.textureunit
    );

    //activate and bind texture
    gl.activeTexture(gl.TEXTURE0 + this.textureunit);
    gl.bindTexture(gl.TEXTURE_2D, this.textureId);

    //render children
    super.render(context);

    //clean up
    gl.activeTexture(gl.TEXTURE0 + this.textureunit);
    gl.bindTexture(gl.TEXTURE_2D, null);

    //disable texturing in shader
    gl.uniform1i(
      gl.getUniformLocation(context.shader, "u_enableObjectTexture"),
      0
    );
  }
}
