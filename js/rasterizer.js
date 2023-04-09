class Rasterizer {
	constructor(screen, camera) {
		this.screen = screen;
		this.camera = camera;
		this.depthBuffer = this.createDepthBuffer(screen.getWidth(), screen.getHeight());
	}

	render(mesh) {

		this.depthBuffer = this.createDepthBuffer(screen.getWidth(), screen.getHeight());

		for (let i = 0; i < mesh.indices.length; i+=3) {
			const screenSpace = [];

			const v0 = mesh.vertices[mesh.indices[i]];
			const v1 = mesh.vertices[mesh.indices[i+1]];
			const v2 = mesh.vertices[mesh.indices[i+2]];

			screenSpace[0] = this.processVertex(v0.vertex);
			screenSpace[1] = this.processVertex(v1.vertex);
			screenSpace[2] = this.processVertex(v2.vertex);

			const triangleSS = [screenSpace[0].ss, screenSpace[1].ss, screenSpace[2].ss];
			const bb = this.getTriangleBoundingBox(triangleSS);

			// Iterate through pixels in bounding box
			for (let y = bb.minY; y < bb.maxY; y++) {
				for (let x = bb.minX; x < bb.maxX; x++) {
					const bary = this.getBarycentricCoords(triangleSS, new Vector2(x, y));

					// Is inside triangle
					if (bary.x > 0 && bary.y > 0 && bary.z > 0 && bary.sum() >= 0.999) {

						// Depth test
						const zIndex = (y * this.screen.getWidth()) + x;
						const newZ = bary.x * screenSpace[0].ndc.z + bary.y * screenSpace[1].ndc.z + bary.z * screenSpace[2].ndc.z;
						const oldZ = this.depthBuffer[zIndex];
						if (newZ > oldZ) {
							continue;
						}
						this.depthBuffer[zIndex] = newZ;

						// Render pixel
						const color = new Vector3(
							bary.x * v0.color.x + bary.y * v1.color.x + bary.z * v2.color.x,
							bary.x * v0.color.y + bary.y * v1.color.y + bary.z * v2.color.y,
							bary.x * v0.color.z + bary.y * v1.color.z + bary.z * v2.color.z,
						)
						this.screen.setPixel(color, x, y);
					}
				}
			}
	
			//this.drawTriangle(triangleSS);
			//this.drawBoundingBox(bb);
		}

		this.screen.swap();
	}

	processVertex(vertex) {
		let v = new Vector4(vertex.x, vertex.y, vertex.z, 1);

		const view = v.multMat4(this.camera.view);
		const clip = view.multMat4(this.camera.projection);
		const ndc = new Vector2(clip.x / clip.w, clip.y / clip.w);

		const screenX = Math.round((ndc.x + 1) * this.screen.getWidth() / 2);
		const screenY = Math.round((ndc.y + 1) * this.screen.getHeight() / 2);
		return { ss: new Vector2(screenX, screenY), ndc: ndc };
	}

	getTriangleBoundingBox(triangle) {
		const minX = Math.min(triangle[0].x, triangle[1].x, triangle[2].x);
		const minY = Math.min(triangle[0].y, triangle[1].y, triangle[2].y);
		const maxX = Math.max(triangle[0].x, triangle[1].x, triangle[2].x);
		const maxY = Math.max(triangle[0].y, triangle[1].y, triangle[2].y);
		return {minX: minX, minY: minY, maxX: maxX, maxY: maxY};
	}

	// https://medium.com/@aminere/software-rendering-from-scratch-f60127a7cd58
	getBarycentricCoords(t, p) {
		const v0 = t[1].sub(t[0]);
		const v1 = t[2].sub(t[0]);
		const v2 = p.sub(t[0]);
		const d00 = v0.dot(v0);
		const d01 = v0.dot(v1);
		const d11 = v1.dot(v1);
		const d20 = v2.dot(v0);
		const d21 = v2.dot(v1);
		const det = (d00 * d11 - d01 * d01);
		const v = (d11 * d20 - d01 * d21) / det;
		const w = (d00 * d21 - d01 * d20) / det;
		const u = 1.0 - v - w;
		return new Vector3(u, v, w);
	}

	createDepthBuffer(width, height) {
		const len = width * height;
		let depthBuffer = [];
		for (let i = 0; i < len; i++) {
			depthBuffer[i] = 1;
		}
		return depthBuffer;
	}

	drawTriangle(triangle) {
		this.drawLine(triangle[0].x, triangle[0].y, triangle[1].x, triangle[1].y)
		this.drawLine(triangle[1].x, triangle[1].y, triangle[2].x, triangle[2].y)
		this.drawLine(triangle[2].x, triangle[2].y, triangle[0].x, triangle[0].y)
	}

	drawBoundingBox(bb) {
		this.drawLine(bb.minX, bb.minY, bb.maxX, bb.minY);
		this.drawLine(bb.maxX, bb.minY, bb.maxX, bb.maxY);
		this.drawLine(bb.maxX, bb.maxY, bb.minX, bb.maxY);
		this.drawLine(bb.minX, bb.maxY, bb.minX, bb.minY);
	}

	//https://github.com/ssloy/tinyrenderer/wiki/Lesson-1:-Bresenham%E2%80%99s-Line-Drawing-Algorithm
	drawLine(x0, y0, x1, y1) {
		let steep = false;
		if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
			[x0, y0] = [y0, x0];
			[x1, y1] = [y1, x1];
			steep = true;
		}
		if (x0 > x1) {
			[x0, x1] = [x1, x0];
			[y0, y1] = [y1, y0];
		}
		const dx = x1 - x0;
		const dy = y1 - y0;
		let derror2 = Math.abs(dy) * 2;
		let error2 = 0;
		let y = y0;
		for (let x = x0; x <= x1; x++) {
			if (steep) {
				this.screen.setPixel(new Vector3(1, 0 ,0), y, x);
			} else {
				this.screen.setPixel(new Vector3(0, 1 ,0), x, y);
			}
			error2 += derror2;
			if (error2 > dx) {
				y += (y1 > y0 ? 1 : -1);
				error2 -= dx * 2;
			}
		}
	}
}