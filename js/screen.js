class Screen {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");	
		this.imageData = this.ctx.createImageData(canvas.width, canvas.height);
	}

	setPixel(color, x, y) {
		const w = this.canvas.width;
		const h = this.canvas.height;
		const stride = 4;

		const i = ((h - y) * w * stride) + x * stride;

		this.imageData.data[i + 0] = color.x * 255;
		this.imageData.data[i + 1] = color.y * 255;
		this.imageData.data[i + 2] = color.z * 255;
		this.imageData.data[i + 3] = 255;//color.a * 255;
	}

	swap() {
		this.ctx.putImageData(this.imageData, 0, 0);
	}

	clear() {
		for (let i = 0; i < this.imageData.data.length; i+=4) {
			this.imageData.data[i] = 255;
			this.imageData.data[i + 1] = 255;
			this.imageData.data[i + 2] = 255;
			this.imageData.data[i + 3] = 255;
		}
		this.swap();
	}

	getWidth() {
		return this.canvas.width;
	}

	getHeight() {
		return this.canvas.height;
	}
}