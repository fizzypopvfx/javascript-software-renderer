class PerspectiveCamera {
	constructor(fovDeg, aspect, zNear, zFar) {
		this.position = new Vector3(0, 0, 3);
		this.projection = this.projection = Mat4.perspective(Utils.radians(fovDeg), aspect, zNear, zFar);
		this.view = new Mat4();
		this.commitViewMatrix();
	}

	commitViewMatrix() {
		const camPos = this.position;
		const camTarget = new Vector3(0, 0, 0);
		const camUp = new Vector3(0, 1, 0);
		
		this.view = Mat4.lookAt(camPos, camTarget, camUp);
	}

	viewMatrix() {
		return this.view;
	}

	projectionMatrix() {
		return this.projection;
	}
}