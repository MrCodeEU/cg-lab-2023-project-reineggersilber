class SpotLightNode extends LightSGNode {
	constructor(children) {
		super(null, children);
		this.direction = vec3.normalize(vec3.create(), vec3.fromValues(1, -0.5, 0));
		this.angle = Math.PI / 8;
		this._worldDirection = [0, 0, 0];

		this.ambient = [0.0, 0.0, 0.0, 1];
		this.diffuse = [0,0,0];
		this.specular = [0,0,0];
		this.position = [0, 0, 0];
		this.uniform = "u_spotLight";
	}

	setLightUniforms(context) {
		// only if shader is available
		if (context.shader && isValidUniformLocation(gl.getUniformLocation(context.shader, this.uniform + 'Pos'))) {
			const gl = context.gl;
			// set direction of spot light and angle of the light cone
			gl.uniform3fv(gl.getUniformLocation(context.shader, this.uniform + '.direction'), this._worldDirection);
			gl.uniform1f(gl.getUniformLocation(context.shader, this.uniform + '.angle'), this.angle);
			super.setLightUniforms(context)
		}
	}

	setLightPosition(context) {
		// only if shader is available
		if (context.shader && isValidUniformLocation(gl.getUniformLocation(context.shader, this.uniform + 'Pos'))) {
			const gl = context.gl;
			const position = this._worldPosition || this.position;
			// set the position of the light in de shader for calculation of the light
			gl.uniform3f(gl.getUniformLocation(context.shader, this.uniform + 'Pos'), position[0], position[1], position[2]);
		}
	}

	computeLightPosition(context) {
		// transform the position of the light to world coordinates
		const modelViewMatrix = mat4.multiply(mat4.create(), context.viewMatrix, context.sceneMatrix);
		const original = this.position;
		// calculate the world position of the light
		this._worldPosition = vec4.transformMat4(vec4.create(), vec4.fromValues(original[0], original[1], original[2], 1), modelViewMatrix);
		// calculat ethe normal matrix to transform the direction of the light
		let nMat = mat3.normalFromMat4(mat3.create(), modelViewMatrix);
		// set those values to the light in the shader
		vec3.transformMat3(this._worldDirection, this.direction, nMat);
	}
}