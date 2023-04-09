class Vertex {
	constructor(vertex, normal, uv, color) {
		this.vertex = vertex;
		this.normal = normal;
		this.uv = uv;
		this.color = color;
	}
}

class Mesh {
	constructor(vertices, indices) {
		this.vertices = vertices;
		this.indices = indices;
	}
}