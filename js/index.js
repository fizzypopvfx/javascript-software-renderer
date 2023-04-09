let screen;
let rasterizer;
let camera;
let lastTimestamp = 0;

function loadCanvas() {
	const canvas = document.getElementById("mainCanvas");

	screen = new Screen(canvas);
	screen.clear();

	camera = new PerspectiveCamera(45.0, screen.getWidth() / screen.getHeight(), 0.1, 100.0);
	rasterizer = new Rasterizer(screen, camera);

	loop();
}

function draw(timestamp) {
	const mesh = createTriangleMesh();

	camera.position.x = Math.sin(timestamp * 0.001);
	camera.position.z = Math.cos(timestamp * 0.001);
	camera.position = camera.position.multScalar(3);
	camera.commitViewMatrix();

	screen.clear();
	rasterizer.render(mesh);
}

function loop(timestamp) {
	const stats = document.getElementById("stats");
	const deltaTime = timestamp - lastTimestamp;
	stats.innerHTML = `${Math.floor(1000.0 / deltaTime)} fps`;
	lastTimestamp = timestamp;

	draw(timestamp);
	
	window.requestAnimationFrame(loop);
}

function createTriangleMesh() {
	const vertices = [
		new Vertex(new Vector3(-1, -1, 0), new Vector3(0, 0, 1), new Vector2(0, 0), new Vector3(1, 0, 1)),
		new Vertex(new Vector3(1, -1, 0), new Vector3(0, 0, 1), new Vector2(1, 0), new Vector3(0, 1, 1)),
		new Vertex(new Vector3(1, 1, 0), new Vector3(0, 0, 1), new Vector2(1, 1), new Vector3(0, 1, 0)),
		new Vertex(new Vector3(-1, 1, 0), new Vector3(0, 0, 1), new Vector2(0, 1), new Vector3(1, 0, 0))
	]
	const indices = [
		0, 1, 2, 
		2, 3, 0
	];
	return new Mesh(vertices, indices);
}