class Mat3 {
	constructor() {
		this.m = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
		];
	}	
}

class Mat4 {
	constructor() {
		this.m = [
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1],
		];
	}

	static createWithRows(a, b, c, d) {
		let m = new Mat3();
		m.m[0] = a;
		m.m[1] = b;
		m.m[2] = c;
		m.m[3] = d;
		return m;
	}

	static perspective(fov, aspect, zNear, zFar) {
		let mat = new Mat4();
		const tanHalfFov = Math.tan(fov/2);
		mat.m[0][0] = 1.0 / (tanHalfFov * aspect);
		mat.m[1][1] = 1.0 / tanHalfFov;
		mat.m[2][2] = -(zFar + zNear) / (zFar - zNear);
		mat.m[2][3] = -1.0;
		mat.m[3][2] = (2 * zFar * zNear) / (zFar - zNear);
		return mat;
	}

	static ortho(left, right, bottom, top, zNear, zFar) {
		let mat = new Mat4();
		mat.m[0][0] = 2 / (right - left);
		mat.m[1][1] = 2 / (top - bottom);
		mat.m[2][2] = -2 / (zFar - zNear);
		mat.m[3][0] = -(right + left) / (right - left);
		mat.m[3][1] = -(top + bottom) / (top - bottom);
		mat.m[3][2] = -(zFar + zNear) / (zFar - zNear);
		return mat;
	}

	static lookAt(eye, at, up) {
		const fwd = at.sub(eye).normalize();
		const right = fwd.cross(up).normalize();
		const newUp = right.cross(fwd).normalize();

		let m = new Mat4();
		m.m[0][0] = right.x;
		m.m[1][0] = right.y;
		m.m[2][0] = right.z;
		m.m[0][1] = newUp.x;
		m.m[1][1] = newUp.y;
		m.m[2][1] = newUp.z;
		m.m[0][2] = -fwd.x;
		m.m[1][2] = -fwd.y;
		m.m[2][2] = -fwd.z;
		m.m[3][0] = -right.dot(eye);
		m.m[3][1] = -newUp.dot(eye);
		m.m[3][2] = fwd.dot(eye);

		return m;
	}
}