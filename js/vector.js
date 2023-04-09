class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	sub(v) {
		return new Vector2(this.x - v.x, this.y - v.y);
	}

	dot(v) {
		return (this.x * v.x) + (this.y * v.y);
	}
}


class Vector3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(v) {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	sub(v) {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	mult(v) {
		return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
	}

	multScalar(s) {
		return new Vector3(this.x * s, this.y * s, this.z * s);
	}

	div(v) {
		return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
	}

	divScalar(s) {
		return new Vector3(this.x / s, this.y / s, this.z / s);
	}

	negate() {
		return new Vector3(-this.x, -this.y, -this.z);
	}

	dot(v) {
		return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
	}

	cross(v) {
		return new Vector3(
			this.y * v.z - this.z * v.y, 
			this.z * v.x - this.x * v.z, 
			this.x * v.y - this.y * v.x
		);
	}

	normalize() {
		const length = this.length();
		if (length === 0) {
			return new Vector3(this.x, this.y, this.z);
		}
		return new Vector3(this.x / length, this.y / length, this.z / length);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	min(v) {
		return new Vector3(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z));
	}

	max(v) {
		return new Vector3(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z));
	}

	distance(v) {
		return Math.sqrt(this.distanceSq(v));
	}

	distanceSq(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		const dz = this.z - v.z;
		return dx * dx + dy * dy + dz * dz;
	}

	multMat3(m) {
		const tx = this.x;
		const ty = this.y;
		const tz = this.z;
		const x = m.m[0][0] * tx + m.m[0][0] * ty + m.m[0][0] * tz;
		const y = m.m[0][1] * tx + m.m[0][1] * ty + m.m[0][1] * tz;
		const z = m.m[0][2] * tx + m.m[0][2] * ty + m.m[0][2] * tz;
		return new Vector3(x, y, z);
	}

	sum() {
		return this.x + this.y + this.z;
	}
}



class Vector4 {
	constructor(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	add(v) {
		return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
	}

	sub(v) {
		return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
	}

	mult(v) {
		return new Vector4(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w);
	}

	multScalar(s) {
		return new Vector4(this.x * s, this.y * s, this.z * s, this.w * s);
	}

	div(v) {
		return new Vector4(this.x / v.x, this.y / v.y, this.z / v.z, this.w / v.w);
	}

	divScalar(s) {
		return new Vector4(this.x / s, this.y / s, this.z / s, this.w / s);
	}

	negate() {
		return new Vector4(-this.x, -this.y, -this.z, -this.w);
	}

	dot(v) {
		return (this.x * v.x) + (this.y * v.y) + (this.z * v.z) + (this.w * v.w);
	}

	normalize() {
		const length = this.length();
		if (length === 0) {
			return new Vector4(this.x, this.y, this.z, this.w);
		}
		return new Vector4(this.x / length, this.y / length, this.z / length, this.w / length);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}

	min(v) {
		return new Vector4(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z), Math.min(this.w, v.w));
	}

	max(v) {
		return new Vector4(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z), Math.max(this.w, v.w));
	}

	multMat4(m) {
		const tx = this.x;
		const ty = this.y;
		const tz = this.z;
		const tw = this.w;
		const x = m.m[0][0] * tx + m.m[1][0] * ty + m.m[2][0] * tz + m.m[3][0] * tw;
		const y = m.m[0][1] * tx + m.m[1][1] * ty + m.m[2][1] * tz + m.m[3][1] * tw;
		const z = m.m[0][2] * tx + m.m[1][2] * ty + m.m[2][2] * tz + m.m[3][2] * tw;
		const w = m.m[0][3] * tx + m.m[1][3] * ty + m.m[2][3] * tz + m.m[3][3] * tw;
		return new Vector4(x, y, z, w);
	}
}